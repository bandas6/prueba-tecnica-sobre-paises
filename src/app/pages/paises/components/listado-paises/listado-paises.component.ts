import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries/countries.service';

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

  ngOnInit() { }


  contruirFormulario() {
    this.formPaises = this.formBuilder.group({
      paises: this.formBuilder.array([])
    })
  }

  get listarPaises() {
    return this.formPaises.get('paises') as FormArray;
  }

  guardarPaises(pais: any = null) {
    console.log(pais);
    this.listarPaises.push(this.nuevoPais(pais))
  }

  nuevoPais(pais: any = null) {

    let nombre = null;
    let bandera = null;

    if (pais) {
      if (pais.nombre) nombre = pais.nombre;
      if (pais.bandera) bandera = pais.bandera;
    }

    return this.formBuilder.group({
      nombre: [nombre, []],
      svg: [bandera, []],
      check: [false]
    })
  }


  verDetalles(pais: any = null) {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastClickTime < this.doubleClickDelay) {
      this.onChipDoubleClick(pais);  // Si es un doble clic, ejecutar la lógica
    }
    this.lastClickTime = currentTime;
  }

  onChipDoubleClick(pais: any): void {
    // Lógica que deseas ejecutar cuando se detecta un doble clic en el chip
    console.log('Doble clic detectado en el chip del país:', pais.value);

    this.router.navigate([`/pages/detalles/${pais.value.nombre}`])

  

  }

}
