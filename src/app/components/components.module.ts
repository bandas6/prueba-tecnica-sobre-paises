import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { PrecentacionComponent } from './precentacion/precentacion.component';



@NgModule({
  declarations: [HeaderComponent, PrecentacionComponent],
  exports: [HeaderComponent, PrecentacionComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ]
})
export class ComponentsModule { }
