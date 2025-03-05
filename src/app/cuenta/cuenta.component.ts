import { Component, OnInit } from '@angular/core';
import { CuentaService } from './cuenta.service';
import { Cuenta } from './cuenta.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  mensaje: string = '';
  seccionActiva: 'registrar' | 'gestionar' | 'editar' = 'registrar';
  filtroClienteId: number | null = null;
  cuentaEnEdicion: Cuenta | null = null;
  numeroBusqueda: string = '';
  mensajeBusqueda: string = '';
  cuentas: Cuenta[] = [];
  cuentasFiltradas: Cuenta[] = [];
  nuevaCuenta: Cuenta = { numero: '', saldo: 0, idCliente: 0 };

  constructor(
    private cuentaService: CuentaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCuentas();
    this.route.paramMap.subscribe((params) => {
      const numeroCuenta = params.get('numero');
      if (numeroCuenta) {
        this.cargarCuentaParaEditar(numeroCuenta);
        this.seccionActiva = 'editar'; // Activa la sección de edición correctamente
      }
    });
  }
  

  cargarCuentas(): void {
    this.cuentaService.getCuentas().subscribe({
      next: (data: Cuenta[]) => {
        this.cuentas = data;
        this.filtrarCuentas();
      },
      error: (err: any) => this.mostrarMensaje(`Error al obtener cuentas: ${err.message}`, 'error')
    });
  }

  agregarCuenta(): void {
    this.cuentaService.createCuenta(this.nuevaCuenta).subscribe({
      next: () => {
        this.mostrarMensaje('Cuenta agregada correctamente.', 'success');
        this.cargarCuentas();
        this.nuevaCuenta = { numero: '', saldo: 0, idCliente: 0 };
      },
      error: (err) => this.mostrarMensaje(`Error al agregar cuenta: ${err.message}`, 'error')
    });
  }

  buscarCuenta(): void {
    if (!this.numeroBusqueda.trim()) {
      this.mensajeBusqueda = 'Por favor, ingrese un número de cuenta.';
      return;
    }

    this.cuentaService.getCuenta(this.numeroBusqueda).subscribe({
      next: (data: Cuenta) => {
        this.cuentas = [data];
        this.mensajeBusqueda = '';
      },
      error: () => {
        this.mensajeBusqueda = 'No se encontró ninguna cuenta con ese número.';
        this.cuentas = [];
      }
    });
  }

  cargarCuentaParaEditar(numero: string): void {
    this.cuentaService.getCuenta(numero).subscribe({
      next: (data) => {
        this.cuentaEnEdicion = data;
        this.seccionActiva = 'editar';
      },
      error: (err) => this.mostrarMensaje(`Error al obtener cuenta: ${err.message}`, 'error')
    });
  }

  actualizarCuenta(): void {
    if (!this.cuentaEnEdicion) return;

    this.cuentaService.updateCuenta(this.cuentaEnEdicion.numero, this.cuentaEnEdicion).subscribe({
      next: () => {
        this.mostrarMensaje('Cuenta actualizada correctamente.', 'success');
        this.cargarCuentas();
        this.seccionActiva = 'gestionar';
        this.cuentaEnEdicion = null;
      },
      error: (err) => this.mostrarMensaje(`Error al actualizar cuenta: ${err.message}`, 'error')
    });
  }

  eliminarCuenta(numero: string): void {
    this.cuentaService.deleteCuenta(numero).subscribe({
      next: () => {
        this.mostrarMensaje('Cuenta eliminada correctamente.', 'success');
        this.cargarCuentas();
      },
      error: (err) => this.mostrarMensaje(`Error al eliminar cuenta: ${err.message}`, 'error')
    });
  }

  filtrarCuentas(): void {
    if (this.filtroClienteId !== null) {
      this.cuentasFiltradas = this.cuentas.filter(cuenta => cuenta.idCliente === this.filtroClienteId);
    } else {
      this.cuentasFiltradas = [...this.cuentas];
    }
  }

  mostrarSeccion(seccion: 'registrar' | 'gestionar' | 'editar'): void {
    this.seccionActiva = seccion;
  }

  private mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.mensaje = texto;
    setTimeout(() => (this.mensaje = ''), 3000);
  }
}
