import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css'] // Cambié 'styleUrl' a 'styleUrls' para corregir la propiedad
})
export class ListaMascotasComponent implements OnInit {
  mascotas: MascotaModel[] = []; // Inicializa como un array vacío
  selectedFile: File | null = null; // Para manejar la selección de archivos

  constructor(private mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.cargarMascotas(); // Llama a cargarMascotas al iniciar
  }

  cargarMascotas() {
    this.mascotaService.obtenerMascotas().subscribe(
      (data: MascotaModel[]) => {
        this.mascotas = data; // Asigna los datos a la variable mascotas
      },
      (error) => {
        console.error('Error al cargar las mascotas:', error);
        }
      );
    }

  onFileSelected(event: Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
       this.selectedFile = fileInput.files[0];
      }
    }

    agregarMascota(nombre: string, edad: string) {
      const formData = new FormData();
      formData.append('foto', this.selectedFile!); // Asegura que selectedFile no sea null
      formData.append('nombre', nombre);
      formData.append('edad', edad);
      // Añade otros campos si es necesario

      this.mascotaService.agregarMascota(formData).subscribe(
        (response) => {
        console.log('Mascota agregada:', response);
        this.cargarMascotas(); // Recargar la lista después de agregar la mascota
      },
      (error) => {
        console.error('Error al agregar mascota:', error);
      }
    );
  }
      
  borrarMascota(idMascota:string){
    this.mascotaService.borrarMascota(idMascota).subscribe({
      next: data => {
        console.log(`Registro Eliminado`);
        this.cargarMascotas(); // Carga nuevamente las mascotas después de eliminar
      },
      error: err => {
        console.log(`Error al eliminar Registro ${err}`);
      }
    });
  }
} 