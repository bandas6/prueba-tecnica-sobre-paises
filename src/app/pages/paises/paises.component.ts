import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from "../../components/components.module";
import { ListadoPaisesComponent } from "./components/listado-paises/listado-paises.component";
import { SegmentPaisesComponent } from "./components/segment-paises/segment-paises.component";

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss'],
  imports: [ComponentsModule, SegmentPaisesComponent, IonicModule, ListadoPaisesComponent],
})
export class PaisesComponent implements OnInit {

  paises: any[] = [];
  paisesSinModificar: any[] = [];

  constructor() { }

  ngOnInit() { }


  paisesEncontrados(paises: any) {
    this.paises = paises;
    this.paisesSinModificar = paises;
  }

  buscarPais(pais: any) {
    this.paises = this.buscarPaises(pais.detail.value);
  }

  buscarPaises(busqueda: string) {
    if (busqueda === '') {
      return this.paisesSinModificar;
    }
    return this.paises.filter((pais: any) => {
      return pais.nombre.toLowerCase().includes(busqueda.toLowerCase())
    }
    );
  }

}
