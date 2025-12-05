import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, RouterModule], 
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>Bienvenido a la App</h1>
      <p>Este es el frontend base funcionando correctamente.</p>

      <ion-button routerLink="/login" expand="block" color="primary">
        Ir a Login
      </ion-button>
    </ion-content>
  `
})
export class HomePage {}
