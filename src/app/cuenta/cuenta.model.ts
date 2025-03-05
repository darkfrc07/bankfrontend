export class Cuenta {
  id?: number;
  numero: string;
  saldo: number;
  idCliente: number;

  constructor(numero: string, saldo: number, idCliente: number, id?: number) {
    this.id = id;
    this.numero = numero;
    this.saldo = saldo;
    this.idCliente = idCliente;
  }
}
