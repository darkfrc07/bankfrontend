import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { ClienteComponent } from './app/cliente/cliente.component';
import { CuentaComponent } from './app/cuenta/cuenta.component';
import { MovimientoComponent } from './app/movimiento/movimiento.component';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

const routes: Routes = [
  { path: '', redirectTo: '/cuentas', pathMatch: 'full' }, // Esto evita errores en la ruta raíz
  { path: 'clientes', component: ClienteComponent },
  { path: 'cuentas', component: CuentaComponent },
  { path: 'movimientos', component: MovimientoComponent },
  { path: 'editar-cuenta/:numero', component: CuentaComponent } // Asegura que esta ruta esté bien escrita
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),  // 🚀 Aquí van las rutas bien configuradas
    importProvidersFrom(FormsModule),
    importProvidersFrom(CommonModule)
  ]
}).catch(err => console.error(err));
