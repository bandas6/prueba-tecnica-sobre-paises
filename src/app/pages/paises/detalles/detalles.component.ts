import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { StorageService } from 'src/app/services/storage/storage.service';
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
  storageService = inject(StorageService);

  nombrePais!: string;

  paisEncontrado: any;

  constructor() { }

  ngOnInit() {

    this.activatedRouter.queryParams.subscribe(async (queryParams: any) => {
     
      const { pais, region } = queryParams;
    
      if (pais && region) {
        
        const paisesDeEstaRegion: any[] = await this.storageService.get(region.toLowerCase()).then((storage) => {
          return storage;
        });

        if (!paisesDeEstaRegion) {
          this.obtenerDetallesPaisPorNombre(pais);
        } else {
          this.paisEncontrado = paisesDeEstaRegion.find((p: any) => p.nombre === pais);
        }

      }
    });

  }


  obtenerDetallesPaisPorNombre(nombrePais: string) {
    this.countriesService.obtenerPaisPorNombre(nombrePais).subscribe({
      next: (datos: any) => {
        this.paisEncontrado = {
          nombreOficial: datos[0].name.official || null,
          capital: datos[0].capital[0] || null,
          poblacion: datos[0].population || null,
          idiomas: datos[0].languages || null,
          moneda: datos[0].currencies || null,
          bandera: datos[0].flags.svg || null
        };
      },
      error: (error) => {
        console.error('Error al obtener los detalles del país:', error);
      }
    })
  }

}
