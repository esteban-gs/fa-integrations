import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-auth-container',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class ClientAuthContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
