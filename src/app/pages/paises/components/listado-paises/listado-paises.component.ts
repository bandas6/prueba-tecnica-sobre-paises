import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ComparacionesComponent } from '../../comparaciones/comparaciones.component';

@Component({
  selector: 'app-listado-paises',
  templateUrl: './listado-paises.component.html',
  styleUrls: ['./listado-paises.component.scss'],
  imports: [ReactiveFormsModule, IonicModule, CommonModule]
})
export class ListadoPaisesComponent implements OnInit, OnChanges {

  formBuilder = inject(FormBuilder);
  countriesService = inject(CountriesService);

  router = inject(Router);
  modalController = inject(ModalController);

  @Input() paises: any[] = [];

  formPaises!: FormGroup;

  lastClickTime: number = 0;
  doubleClickDelay: number = 300;  // Tiempo en milisegundos para considerar un doble clic

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['paises'] && changes['paises'].currentValue) {
      this.contruirFormulario();
      if (this.paises && this.paises.length > 0) {
        this.paises.forEach(pais => {
          this.guardarPaises(pais);
        });
      }
    }

  }

  ngOnInit() { 
   
  }


  contruirFormulario() {
    this.formPaises = this.formBuilder.group({
      paises: this.formBuilder.array([])
    })
  }

  get listarPaises() {
    return this.formPaises.get('paises') as FormArray;
  }

  guardarPaises(pais: any = null) {
    this.listarPaises.push(this.nuevoPais(pais))
  }

  nuevoPais(pais: any = null) {
    let nombre = null;
    let bandera = null;
    let poblacion = null;
    let region = null;

    if (pais) {
      if (pais.nombre) nombre = pais.nombre;
      if (pais.bandera) bandera = pais.bandera;
      if (pais.poblacion) poblacion = pais.poblacion;
      if (pais.region) region = pais.region;
    }

    return this.formBuilder.group({
      nombre: [nombre, []],
      poblacion: [poblacion, []],
      region: [region, []],
      svg: [bandera, []],
      check: [false]
    })
  }


  verDetalles(pais: any = null) {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastClickTime < this.doubleClickDelay) {
      this.onChipDoubleClick(pais);
    }
    this.lastClickTime = currentTime;
  }

  onChipDoubleClick(pais: any): void {
    console.log(pais.value)
    this.router.navigate(['pages/detalles'], { 
      queryParams: { pais: pais.value.nombre, region: pais.value.region } 
    });
  }

  async compararPoblaciones() {
    let paises: any[] = [];

    for (let index = 0; index < this.listarPaises.controls.length; index++) {
      /* console.log(this.listadoGenerosLibros.controls[index].value); */
      const pais = this.listarPaises.controls[index].value;
      /* console.log('----->', libros.check); */
      if (pais.check) {
        paises.push(pais);
      }
    }
    
    if(paises.length > 0) {

      const modal = await this.modalController.create({
        component: ComparacionesComponent,
        cssClass: 'modals',
        componentProps: { 'paises': paises }
      });
      await modal.present();
      
      //const { data } = await modal.onDidDismiss();
    
    }


  }

}
