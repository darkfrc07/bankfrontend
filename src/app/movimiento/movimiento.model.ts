export interface MovimientoForms {
  id?: number;
  numeroCuenta: string;
  tipo: 'debito' | 'credito';  // Restringe a valores válidos
  valor: number;
}

