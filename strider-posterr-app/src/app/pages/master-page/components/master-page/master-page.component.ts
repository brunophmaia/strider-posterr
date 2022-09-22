import { Component } from '@angular/core';
import { DeviceService } from 'src/app/common/services/device/device.service';
import { insertAtUsername } from 'src/app/common/util/common.util';

@Component({
  selector: 'posterr-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent {

  constructor(public deviceService: DeviceService) { }

  username: string = insertAtUsername("brunophmaia");
  menuOpened: boolean = false;

}
