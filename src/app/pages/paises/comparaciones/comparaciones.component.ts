import { Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

import { Chart } from 'chart.js/auto';
import { ComponentsModule } from "../../../components/components.module";

@Component({
  selector: 'app-comparaciones',
  templateUrl: './comparaciones.component.html',
  styleUrls: ['./comparaciones.component.scss'],
  imports: [IonicModule, ComponentsModule]
})
export class ComparacionesComponent implements OnInit, OnChanges {

  @ViewChild('barChart') barChart!: ElementRef;

  @Input() paises:any[] = [];

  modalController = inject(ModalController);

  constructor() { }

  ngOnInit() { 

  }

  ngAfterViewInit() {
    if (this.paises && this.paises.length > 0) {
      console.log(this.paises)
      this.crearGrafico();
    }
  }

   ngOnChanges(changes: SimpleChanges): void {
  
      if (changes['paises'] && changes['paises'].currentValue) {
        if (this.paises && this.paises.length > 0) {
          console.log(this.paises)
          this.crearGrafico();
        }
      }
  
    }

  crearGrafico() {
    new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.paises.map(p => p.nombre),
        datasets: [{
          label: 'Población',
          data: this.paises.map(p => p.poblacion),
          backgroundColor: this.paises.map(p => p.color)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

}
