import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientoForms } from './movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = 'http://localhost:8080/movimientos';

  constructor(private http: HttpClient) {}

  getMovimientosPorCuenta(numeroCuenta: string): Observable<MovimientoForms[]> {
    return this.http.get<MovimientoForms[]>(`${this.apiUrl}/cuenta/${numeroCuenta}`);
  }

  createMovimiento(movimiento: MovimientoForms): Observable<MovimientoForms> {
    return this.http.post<MovimientoForms>(this.apiUrl, movimiento);
  }
}
