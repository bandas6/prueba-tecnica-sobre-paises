import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private url = environment.url;

  private http = inject(HttpClient);

  constructor() { }

  //funcion para obtener regiones disponibles
  obtenerRegiones(){
    return this.http.get(`${this.url}/regiones`);
  }

  // funcion para obtener paises por region
  obtenerPaisesPorRegion(region: string){
    return this.http.get(`${this.url}/region/${region}`);
  }
  
}
