import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../services/tasks.service';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';

interface Task {
  IdTask: number;
  IdUser: number;
  Descripcion: string;
  Estado: string;
  FechaCreacion: string | null;
  FechaModificacion: string | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Mis Tareas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-segment [value]="section" (ionChange)="segmentChanged($event)">
        <ion-segment-button value="pendientes">Pendientes</ion-segment-button>
        <ion-segment-button value="completas">Completas</ion-segment-button>
      </ion-segment>

      <ng-container *ngIf="loading; else listTpl">
        <ion-spinner name="dots"></ion-spinner>
      </ng-container>

      <ng-template #listTpl>

        <!-- Si no hay tareas -->
        <div *ngIf="tasks.length === 0">
          <p>No hay tareas en esta sección.</p>
        </div>

        <!-- Lista -->
        <ion-list *ngIf="tasks.length > 0">
          <ion-item-sliding *ngFor="let t of tasks">
            <ion-item>
              <ion-label>
                <h2>#{{ t.IdTask }} - {{ t.Descripcion }}</h2>

                <p>Estado: {{ t.Estado }}</p>

                <p>
                  Creada: {{ t.FechaCreacion ? (t.FechaCreacion | date:'short') : '-' }}
                  <span *ngIf="t.FechaModificacion">
                    · Modificada: {{ t.FechaModificacion | date:'short' }}
                  </span>
                </p>

              </ion-label>
            </ion-item>

            <ion-item-options side="end">

              <ion-item-option (click)="onToggleEstado(t)" color="success">
                {{ t.Estado === 'Pendiente' ? 'Marcar Completa' : 'Marcar Pendiente' }}
              </ion-item-option>

              <ion-item-option (click)="onEliminar(t.IdTask)" color="danger">
                Eliminar
              </ion-item-option>

            </ion-item-options>
          </ion-item-sliding>
        </ion-list>

      </ng-template>

    </ion-content>
  `
})
export class DashboardPage implements OnInit {

  section: 'pendientes' | 'completas' = 'pendientes';
  tasks: Task[] = [];
  loading = false;

  constructor(
    private tasksService: TasksService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  segmentChanged(ev: any) {
    this.section = ev.detail?.value || 'pendientes';
    this.loadTasks();
  }

  async loadTasks() {
    this.loading = true;

    try {
      const resp: any = this.section === 'pendientes'
        ? await firstValueFrom(this.tasksService.pendientes())
        : await firstValueFrom(this.tasksService.completas());

      this.tasks = Array.isArray(resp) ? resp : [];

    } catch (err) {
      console.error('Error cargando tareas', err);
      this.presentToast('Error cargando tareas');
      this.tasks = [];
    }

    this.loading = false;
  }

  async onToggleEstado(task: Task) {
    const nuevoEstado = task.Estado === 'Pendiente' ? 'Completa' : 'Pendiente';

    try {
      await firstValueFrom(this.tasksService.actualizarEstado(task.IdTask, { estado: nuevoEstado }));
      this.presentToast('Estado actualizado');
      this.loadTasks();
    } catch (err) {
      console.error(err);
      this.presentToast('No se pudo actualizar');
    }
  }

  async onEliminar(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseas eliminar esta tarea?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await firstValueFrom(this.tasksService.eliminarTarea(id));
              this.presentToast('Tarea eliminada');
              this.loadTasks();
            } catch (err) {
              console.error(err);
              this.presentToast('No se pudo eliminar');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1800
    });
    toast.present();
  }
}
