import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { PrecentacionComponent } from './precentacion/precentacion.component';



@NgModule({
  declarations: [HeaderComponent, PrecentacionComponent],
  exports: [HeaderComponent, PrecentacionComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
