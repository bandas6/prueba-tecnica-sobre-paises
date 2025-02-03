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
export class PaisesComponent  implements OnInit {

  paises:any[] = [];

  constructor() { }

  ngOnInit() {}


  paisesEncontrados(paises:any){
    this.paises = paises;
  }

}
