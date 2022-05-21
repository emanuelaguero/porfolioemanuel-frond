import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { EncabezadoFormComponent } from './formulario/encabezado-form/encabezado-form.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { EducacionFormComponent } from './formulario/educacion-form/educacion-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { HabilidadFormComponent } from './formulario/habilidad-form/habilidad-form.component';
import { HabilidadComponent } from './componentes/habilidad/habilidad.component';
import {MatSelectModule} from '@angular/material/select';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LoginComponent } from './componentes/login/login.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { TrabajoComponent } from './componentes/trabajo/trabajo.component';
import { TrabajoFormComponent } from './formulario/trabajo-form/trabajo-form.component';
import { ProyectoFormComponent } from './formulario/proyecto-form/proyecto-form.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    EducacionComponent,
    EncabezadoFormComponent,
    EducacionFormComponent,
    HabilidadFormComponent,
    HabilidadComponent,
    LoginComponent,
    PorfolioComponent,
    TrabajoComponent,
    TrabajoFormComponent,
    ProyectoFormComponent,
    ProyectoComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    
    NgCircleProgressModule.forRoot({
      
      "backgroundColor": "#F1F1F1",
      "backgroundPadding": -18,
      "radius": 60,
      "toFixed": 2,
      "unitsFontSize": "20",
      "unitsFontWeight": "500",
      "outerStrokeColor": "#FF6347",
      "innerStrokeColor": "#32CD32",
      "innerStrokeWidth": 1,
      "titleColor":"black",
      "subtitleColor":"Red",
      "titleFontSize": "26",
      "titleFontWeight": "500",
      "subtitleFontSize": "20",
      "subtitleFontWeight": "600",
      "startFromZero": false,
      "animationDuration":800
    }),
    MatProgressSpinnerModule,
     

    
   
    
    

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
