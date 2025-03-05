export class Cliente {
  id?: number;  // Hacer `id` opcional
  nombre: string;
  direccion: string;
  telefono: string;

  constructor(nombre: string, direccion: string, telefono: string, id?: number) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
  }
}
