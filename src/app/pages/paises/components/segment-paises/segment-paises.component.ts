import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-segment-paises',
  templateUrl: './segment-paises.component.html',
  styleUrls: ['./segment-paises.component.scss'],
  imports: [IonicModule]
})
export class SegmentPaisesComponent implements OnInit {

  private countriesService = inject(CountriesService)
  private storageService = inject(StorageService)

  @Output() paises: EventEmitter<any> = new EventEmitter;

  region: any = 'americas';

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
    this.region = event.detail.value;
    this.obtenerPaisPorRegion();
  }

  async obtenerPaisPorRegion() {

    // Obtiene la lista de países almacenados en el storage
    const paisEnLocalStorage = await this.storageService.get(this.region).then((storage) => {
      return storage;
    });

    if (!paisEnLocalStorage) {
      this.countriesService.obtenerPaisesPorRegion(this.region).subscribe({
        next: (data: any) => {

          this.regionEncontradaSegunSuPais = data.map((data: any) => {
            return {
              nombre: data.name?.common || null,
              bandera: data.flags?.svg || null,
              poblacion: data.population || null,
              region: data.region || null,
              nombreOficial: data.name?.official || null,
              capital: Array.isArray(data.capital) && data.capital.length > 0 ? data.capital[0] : null,
              idiomas: data.languages || null,
              moneda: data.currencies || null,
            };
          });
          

          // Almacena la lista de países en el storage
          this.storageService.set(this.region, this.regionEncontradaSegunSuPais);

          this.paises.emit(this.regionEncontradaSegunSuPais);
        },
        error: (error) => {
          console.error('Error al obtener los países por región', error);
        }
      });
    } else {
      this.regionEncontradaSegunSuPais = paisEnLocalStorage;
      this.paises.emit(this.regionEncontradaSegunSuPais);
    }

  }

}
