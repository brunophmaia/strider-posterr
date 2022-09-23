import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  currentRoute: string;
  previousRoute: string;

  constructor(router: Router) {
    router.events.pipe(
      filter((eventFilter) => eventFilter instanceof NavigationEnd)
    ).subscribe((eventRoute) => {
      this.previousRoute = this.currentRoute;
      this.currentRoute = (eventRoute as any).url;
    });
  }
}
