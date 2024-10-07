import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../shared/mascota.service';
import { MascotaModel } from '../shared/mascota.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  mascotas: MascotaModel[] = [];
  mascotaSeleccionada: MascotaModel | null = null; // Propiedad para almacenar la mascota seleccionada

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
      this.cargarMascotas();
  }

    cargarMascotas(){
    this.mascotaService.obtenerMascotas().subscribe(
      data => {
        this.mascotas = data;
      },
      error => {
        console.error('Error al cargar las mascotas:', error);
      }
    );
  }

  verDetalles(mascota: MascotaModel) {
    this.mascotaSeleccionada = mascota; // Almacena la mascota seleccionada
  }
  cerrarDetalles() {
    this.mascotaSeleccionada = null; // Resetea la mascota seleccionada para cerrar detalles
  } 
}  
