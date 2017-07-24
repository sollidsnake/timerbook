import { Component, Input } from '@angular/core';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html',
  inputs: ['endButton']
})
export class HeaderComponent {

  text: string;
  @Input() endButton: any;

  constructor() {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    
  }
}
