import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fraseChuckNorris: string = 'Cargando chiste...';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.obtenerFraseChuckNorris();
  }

  obtenerFraseChuckNorris() {
    this.http.get<any>('https://api.chucknorris.io/jokes/random').subscribe({
      next: (data) => this.fraseChuckNorris = data.value,
      error: () => this.fraseChuckNorris = 'Error al cargar la frase.'
    });
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }
}
