import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  @Input() tituloHeader: string = '';
  @Input() rutaRegresar: string = '';
  @Input() regresar: boolean = false;

  constructor() { }


  ngOnInit() { }

}
