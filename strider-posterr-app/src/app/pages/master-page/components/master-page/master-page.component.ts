import { Component } from '@angular/core';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'posterr-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent {

  constructor(public deviceService: DeviceService) { }

  username: string = "@brunophmaia";
  menuOpened: boolean = false;

}
