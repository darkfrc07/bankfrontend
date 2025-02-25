import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🔹 Importa FormsModule
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔹 Agrega FormsModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clientes: any[] = [];
  nuevoCliente = { nombre: '', direccion: '', telefono: '' };

  constructor(private clienteService: ClienteService) {}

  cargarClientes() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  agregarCliente() {
    this.clienteService.addCliente(this.nuevoCliente).subscribe(() => {
      alert('Cliente agregado');
      this.nuevoCliente = { nombre: '', direccion: '', telefono: '' };
      this.cargarClientes();
    });
  }
}
