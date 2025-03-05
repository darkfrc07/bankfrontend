import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { MovimientoComponent } from './movimiento/movimiento.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteComponent },
  { path: 'cuentas', component: CuentaComponent },
  { path: 'movimientos', component: MovimientoComponent }
];
