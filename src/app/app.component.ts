import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <img src="assets/colsubsidio-logo.png" alt="Colsubsidio">
      <h1>🏦 Banco App</h1>
    </header>

    <nav>
      <button routerLink="/clientes">👥 Clientes</button>
      <button routerLink="/cuentas">💳 Cuentas</button>
      <button routerLink="/movimientos">🔄 Movimientos</button>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    header { text-align: center; padding: 10px; background: #f8f9fa; }
    nav { display: flex; justify-content: center; gap: 15px; margin: 20px 0; }
    button { padding: 10px; border: none; cursor: pointer; }
  `]
})
export class AppComponent {}
