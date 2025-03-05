import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { MovimientoComponent } from './movimiento/movimiento.component';


const routes: Routes = [
  { path: '', redirectTo: '/cuentas', pathMatch: 'full' }, // Asegura que esta línea esté al inicio
  { path: 'clientes', component: ClienteComponent },
  { path: 'cuentas', component: CuentaComponent },
  { path: 'movimientos', component: MovimientoComponent },
  { path: 'editar-cuenta/:numero', component: CuentaComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}