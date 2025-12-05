import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-item>
        <ion-input [(ngModel)]="email" placeholder="Correo"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input type="password" [(ngModel)]="password" placeholder="Contraseña"></ion-input>
      </ion-item>

      <ion-button expand="block" color="success" (click)="login()">
        Iniciar sesión
      </ion-button>
    </ion-content>
  `
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController
  ) {}

  async login() {
    try {
      const response = await this.auth.login({
        correo: this.email,
        contraseña: this.password
      }).toPromise();

      this.auth.saveToken(response.token);

      this.router.navigate(['/dashboard']);

    } catch (error: any) {
      const t = await this.toast.create({
        message: error.error?.error || 'Error al iniciar sesión',
        duration: 2000,
        color: 'danger'
      });
      t.present();
    }
  }
}
