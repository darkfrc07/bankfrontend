import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component'; // Importa el componente

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppComponent // 🔹 Se importa aquí en lugar de `declarations`
  ],
  providers: [],
  bootstrap: [AppComponent] // Sigue en bootstrap
})
export class AppModule { }
