import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MascotaModel } from './mascota.model';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  BASE_URL='http://localhost:4000';
  constructor(private http: HttpClient) {
  }

  //Lista completa de Mascotas
  obtenerMascotas(){
    return this.http.get<MascotaModel[]>(`${this.BASE_URL}/mascotas/buscar`);
  }

  //Buscar una mascota por ID
  obtenerMascota(idMascota:string){
    return this.http.get<MascotaModel>(`${this.BASE_URL}/mascotas/buscarid/${idMascota}`);
  }

  //AGREGAR con formdata
  agregarMascota(mascota: FormData){
  return this.http.post<string>(`${this.BASE_URL}/mascotas/crear`,mascota);
  }

  //Actualizar una Mascota con formdata
  actualizarMascota(mascota: FormData){
  return this.http.put(`${this.BASE_URL}/mascotas/actualizar/${mascota.get('id')}`,mascota);
  }

  //Eliminar una Mascota
  borrarMascota(idMascota:string){
    return this.http.delete<string>(`${this.BASE_URL}/mascotas/eliminar/${idMascota}`);
  }
}
