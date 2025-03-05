import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from '../cliente/cliente.model'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente: Cliente = new Cliente('', '', '');
  editando = false;
  clienteEditadoId: number | null = null;
  seccionActiva: string = 'registro';
  idBusqueda: number | null = null;
  clienteEncontrado: Cliente | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }

  obtenerClientes(): void {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes);
  }

  agregarCliente(): void {
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.direccion || !this.nuevoCliente.telefono) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (this.editando) {
      if (this.clienteEditadoId !== null && this.clienteEditadoId !== undefined) {
        this.nuevoCliente.id = this.clienteEditadoId;
        this.clienteService.updateCliente(this.nuevoCliente).subscribe(() => {
          this.obtenerClientes();
          this.cancelarEdicion();
        });
      }
    } else {
      this.clienteService.addCliente(this.nuevoCliente).subscribe(() => {
        this.obtenerClientes();
        this.cancelarEdicion();
      });
    }
}


  editarCliente(cliente: Cliente): void {
    this.nuevoCliente = { ...cliente };
    this.clienteEditadoId = cliente.id!;
    this.editando = true;
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(() => this.obtenerClientes());
    }
  }

  buscarCliente(): void {
    this.clienteEncontrado = this.clientes.find(cliente => cliente.id === this.idBusqueda) || null;
  }

  cancelarEdicion(): void {
    this.nuevoCliente = new Cliente('', '', '');
    this.editando = false;
  }
}
