import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { EditarMascotasComponent } from './editar-mascotas/editar-mascotas.component';
import { MascotaService } from './shared/mascota.service';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaMascotasComponent,
    EditarMascotasComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    MascotaService,
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
