import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Clientes
  getClientes() { return this.http.get(`${this.baseUrl}/cliente`); }
  getClienteById(id: number) { return this.http.get(`${this.baseUrl}/cliente/${id}`); }
  createCliente(cliente: any) { return this.http.post(`${this.baseUrl}/cliente`, cliente); }
  updateCliente(id: number, cliente: any) { return this.http.put(`${this.baseUrl}/cliente/${id}`, cliente); }
  deleteCliente(id: number) { return this.http.delete(`${this.baseUrl}/cliente/${id}`); }

  // Cuentas
  getCuentas() { return this.http.get(`${this.baseUrl}/cuentas`); }
  getCuentaByNumero(numero: string) { return this.http.get(`${this.baseUrl}/cuentas/${numero}`); }
  createCuenta(cuenta: any) { return this.http.post(`${this.baseUrl}/cuentas`, cuenta); }
  updateCuenta(numero: string, cuenta: any) { return this.http.put(`${this.baseUrl}/cuentas/${numero}`, cuenta); }
  deleteCuenta(numero: string) { return this.http.delete(`${this.baseUrl}/cuentas/${numero}`); }

  // Movimientos
  getMovimientos() { return this.http.get(`${this.baseUrl}/movimientos`); }
  getMovimientosPorCuenta(numero: string) { return this.http.get(`${this.baseUrl}/movimientos/cuenta/${numero}`); }
  createMovimiento(movimiento: any) { return this.http.post(`${this.baseUrl}/movimientos`, movimiento); }
}