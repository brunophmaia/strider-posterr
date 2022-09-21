import { Component } from '@angular/core';

@Component({
  selector: 'posterr-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent {

  constructor() { }

  isActive = true;
  username: string = "@brunophmaia";
  menuOpened: boolean = false;

}
