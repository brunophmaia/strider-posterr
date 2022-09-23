import { Component } from '@angular/core';
import { RouteService } from './common/services/route/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public routeService: RouteService) {
  }
}
