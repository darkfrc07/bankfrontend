import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cuenta } from './cuenta.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private apiUrl = 'http://localhost:8080/cuentas';

  constructor(private http: HttpClient) {}

  getCuentas(numero?: string): Observable<Cuenta[]> {
    if (numero) {
      return this.http.get<Cuenta[]>(`${this.apiUrl}/${numero}`); // Aquí corregimos la URL
    }
    return this.http.get<Cuenta[]>(`${this.apiUrl}`); // Eliminamos el "/cuentas" duplicado
  }
  
  

  // Obtener UNA cuenta específica (con número de cuenta)
  getCuenta(numero: string): Observable<Cuenta> {
    return this.http.get<Cuenta>(`${this.apiUrl}/${numero}`);
  }

  createCuenta(cuenta: Cuenta): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, cuenta, { headers, responseType: 'text' }).pipe(
      catchError(error => {
        let errorMessage = 'Error al agregar cuenta.';
        if (error.status === 400 && error.error) {
          errorMessage = error.error;  // Captura el mensaje del backend
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  

  updateCuenta(numeroCuenta: string, cuenta: Cuenta): Observable<Cuenta> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Cuenta>(`${this.apiUrl}/${numeroCuenta}`, cuenta, { headers }).pipe(
      catchError(error => {
        console.error('Error al actualizar cuenta:', error);
        return throwError(() => new Error('Error al actualizar cuenta.'));
      })
    );
  }

  deleteCuenta(numeroCuenta: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numeroCuenta}`).pipe(
      catchError(error => {
        console.error('Error al eliminar cuenta:', error);
        return throwError(() => new Error('Error al eliminar cuenta.'));
      })
    );
  }
}
