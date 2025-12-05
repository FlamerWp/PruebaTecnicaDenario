import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    private api = environment.apiUrl;

    constructor(private http: HttpClient) { }

    private getHeaders() {
        const token = localStorage.getItem('token');
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    crearTarea(data: any) {
        return this.http.post(`${this.api}/tasks`, data, this.getHeaders());
    }

    eliminarTarea(id: number) {
        return this.http.delete(`${this.api}/tasks/${id}`, this.getHeaders());
    }

    actualizarEstado(id: number, data: any) {
        return this.http.put(`${this.api}/tasks/${id}`, data, this.getHeaders());
    }

    pendientes() {
        return this.http.get(`${this.api}/tasks/pendientes`, this.getHeaders());
    }

    completas() {
        return this.http.get(`${this.api}/tasks/completas`, this.getHeaders());
    }
}
