import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries/countries.service';

@Component({
  selector: 'app-segment-paises',
  templateUrl: './segment-paises.component.html',
  styleUrls: ['./segment-paises.component.scss'],
  imports: [IonicModule]
})
export class SegmentPaisesComponent implements OnInit {

  private countriesService = inject(CountriesService)

  @Output() paises: EventEmitter<any> = new EventEmitter;

  pais: any = 'americas';

  regionesDisponibles: any[] = [
    { nombre: 'Americas', valor: 'americas' },
    { nombre: 'Asia', valor: 'asia' },
    { nombre: 'Europe', valor: 'europe' },
    { nombre: 'Oceania', valor: 'oceania' },
    { nombre: 'Africa', valor: 'africa' }
  ]

  regionEncontradaSegunSuPais: any;

  constructor() { }

  ngOnInit() {
    this.obtenerPaisPorRegion();
  }

  segmentChanged(event: any) {
    this.pais = event.detail.value;
    this.obtenerPaisPorRegion();
  }

  obtenerPaisPorRegion() {
    this.countriesService.obtenerPaisesPorRegion(this.pais).subscribe({
      next: (data: any) => {

        this.regionEncontradaSegunSuPais = data.map((data: any) => {
          return {
            nombre: data.name.common,
            bandera: data.flags.svg
          }
        });

        this.paises.emit(this.regionEncontradaSegunSuPais);
      },
      error: (error) => {
        console.error('Error al obtener los países por región', error);
      }
    });
  }

}
