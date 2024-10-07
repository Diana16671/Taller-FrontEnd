import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editar-mascotas',
  templateUrl: './editar-mascotas.component.html',
  styleUrls: ['./editar-mascotas.component.css']
})
export class EditarMascotasComponent implements OnInit{

  idMascota= '';
  mascota= new MascotaModel('', '', 0, '', '', '', 'disponible', '');
  selectedFile: File | null = null; //Propiedad para almacenar el archivo seleccionado
  imagePreview: string | ArrayBuffer | null = null; // Propiedad para previsualizar la imagen
  errorMessage: string = ''; // Propiedad para manejar errores

  constructor(private mascotaService: MascotaService,private route: ActivatedRoute,private router: Router){
  }

  ngOnInit(){
    this.idMascota = this.route.snapshot.params['idMascota'];
    console.log(`El idMascota es ${this.idMascota}`);

    if(this.idMascota){
      //Viene de Editar
      this.mascotaService.obtenerMascota(this.idMascota).subscribe({
        next: data=>{
          console.log(data);
          this.mascota=data;
          console.log(this.mascota);
        },
        error: err=>{
          console.log(`Error ${err}`);
          this.errorMessage = 'Error al cargar los datos de la mascota. Por favor, intenta nuevamente';
        }
      });
    }
    else{
      console.log('La solicitud viene de Nueva Mascota');
    }
  }
  //Método para manejar la seleccion de archivos
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Almacena el archivo seleccionado
    // Previsualizar la imagen seleccionada
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result; // Genera la previsualización de la imagen
    };
    reader.readAsDataURL(this.selectedFile); // Lee la imagen seleccionada
    }
  }
  //Método para enviar el formulario
  onSubmit() {
    console.log("On Submit");
    const formData = new FormData();
    formData.append('nombre', this.mascota.nombre);
    formData.append('edad', this.mascota.edad.toString());
    formData.append('especie', this.mascota.especie);
    formData.append('raza', this.mascota.raza);
    formData.append('sexo', this.mascota.sexo);
    formData.append('estado', this.mascota.estado);

    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name); // Agrega la imagen al FormData
    }

    // Envía formData a tu servicio
    if (this.idMascota) {
      // Viene de Editar
      this.mascotaService.actualizarMascota(formData).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/mascotas']);
        },
        error: err => {
          console.log(`Error al actualizar ${err}`);
          this.errorMessage = 'Error al actualizar la mascota. Por favor, intenta nuevamente.';
        }
      });
    } else {
      // Viene de Nueva Mascota
      this.mascotaService.agregarMascota(formData).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/mascotas']);
        },
        error: err => {
          console.log(`Error al Agregar ${err}`);
          this.errorMessage = 'Error al agregar la mascota. Por favor intenta de nuevo';
        }
      });
    }
  }
}