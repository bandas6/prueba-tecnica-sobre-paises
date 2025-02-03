import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DetallesComponent } from './paises/detalles/detalles.component';
import { PaisesComponent } from './paises/paises.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'paises',
        component: PaisesComponent
      },   
      {
        path: 'detalles/:id',
        component: DetallesComponent
      },
      {
        path: '**',
        redirectTo: 'paises'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
