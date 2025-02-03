import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries/countries.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
  imports: [IonicModule]
})
export class DetallesComponent  implements OnInit {

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

  obtenerDetallesPaisPorNombre(nombrePais: string){
    this.countriesService.obtenerPaisPorNombre(nombrePais).subscribe({
      next: (datos) => {
        this.paisEncontrado = datos;
      },
      error: (error) => {
        console.error('Error al obtener los detalles del país:', error);
      }
    })
  }

}
