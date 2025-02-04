import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ComponentsModule } from "../../../components/components.module";

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
  imports: [IonicModule, ComponentsModule, CommonModule]
})
export class DetallesComponent implements OnInit {

  activatedRouter = inject(ActivatedRoute);
  countriesService = inject(CountriesService);

  nombrePais!: string;

  paisEncontrado: any;

  constructor() { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      this.nombrePais = params.get('id') || '';
      this.obtenerDetallesPaisPorNombre(this.nombrePais);
    });
  }

  obtenerDetallesPaisPorNombre(nombrePais: string) {
    this.countriesService.obtenerPaisPorNombre(nombrePais).subscribe({
      next: (datos: any) => {
        this.paisEncontrado = {
          nombreOficial: datos[0].name.official,
          capital: datos[0].capital[0],
          poblacion: datos[0].population,
          idiomas: datos[0].languages,
          moneda: datos[0].currencies,
          bandera: datos[0].flags.svg
        };
        console.log('Detalles del país:', this.paisEncontrado);

      },
      error: (error) => {
        console.error('Error al obtener los detalles del país:', error);
      }
    })
  }

}
