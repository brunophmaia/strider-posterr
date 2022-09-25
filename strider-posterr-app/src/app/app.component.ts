import { Component } from '@angular/core';
import { MockUpDataService } from './common/services/mock/mock-up-data.service';
import { RouteService } from './common/services/route/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public routeService: RouteService,
              public mockUpDataService: MockUpDataService) {
  }
}
