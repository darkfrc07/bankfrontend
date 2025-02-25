import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor() { }

  obtenerMensaje() {
    return "¡Hola desde BancoService!";
  }
}
