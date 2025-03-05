import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovimientoService } from '../movimiento/movimiento.service';
import { MovimientoForms } from '../movimiento/movimiento.model';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {
  movimientos: MovimientoForms[] = [];
  saldo: number = 0;
  mostrarSeccion: 'registro' | 'gestion' = 'registro';
  nuevoMovimiento: MovimientoForms = { numeroCuenta: '', tipo: 'debito', valor: 0 };
  mensaje: string = '';
  mostrarPopup: boolean = false;
  esDebito: boolean = true;
  numeroCuentaBusqueda: string = '';  
  tipoSeleccionado: string = '';       
  mensajeGuardado: string = '';  // Ahora es string para mostrar mensajes personalizados

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {}

  cambiarSeccion(seccion: 'registro' | 'gestion') {
    this.mostrarSeccion = seccion;
    this.movimientos = [];
    this.saldo = 0;
  }

  buscarMovimientos() {
    if (!this.numeroCuentaBusqueda) {
      this.mensaje = 'Ingrese un número de cuenta válido.';
      return;
    }

    this.movimientoService.getMovimientosPorCuenta(this.numeroCuentaBusqueda).subscribe({
      next: (response: MovimientoForms[]) => {
        this.movimientos = response;
        this.calcularSaldo();
        this.mensaje = '';
      },
      error: () => {
        this.mensaje = 'No se encontraron movimientos para esta cuenta.';
      }
    });
  }

  agregarMovimiento() {
    this.movimientoService.createMovimiento(this.nuevoMovimiento).subscribe({
      next: (response: MovimientoForms) => {
        this.mensaje = 'Movimiento registrado con éxito.';
        this.nuevoMovimiento = { numeroCuenta: '', tipo: 'debito', valor: 0 }; // Reiniciar el formulario
      },
      error: () => {
        this.mensaje = 'Error al registrar movimiento.';
      }
    });
  }

  calcularSaldo() {
    this.saldo = this.movimientos.reduce((total, mov) => {
        const valor = Number(mov.valor);
        if (isNaN(valor)) return total;

        const tipo = mov.tipo.trim().toLowerCase();

        return (tipo === 'débito' || tipo === 'debito') 
            ? total + valor  
            : (tipo === 'crédito' || tipo === 'credito') 
                ? total - valor 
                : total; 
    }, 0);
  }

  abrirPopup(tipo: string) {
    this.tipoSeleccionado = tipo;
    this.esDebito = tipo === 'debito'; // Se actualiza correctamente
    this.mostrarPopup = true;
  }
  
  
  cerrarPopup() {
    this.mostrarPopup = false;
  }

  seleccionarMonto(monto: number) {
    if (this.tipoSeleccionado !== 'debito' && this.tipoSeleccionado !== 'credito') {
      console.error('Error: tipo de movimiento inválido');
      return;
    }
  
    this.nuevoMovimiento.tipo = this.tipoSeleccionado; // Ahora estamos seguros de que es válido
    this.nuevoMovimiento.valor = monto;
    this.mostrarPopup = false;
    this.mensajeGuardado = `Movimiento de ${this.nuevoMovimiento.tipo} por ${monto} registrado.`; 
  }
  
  
  
}
