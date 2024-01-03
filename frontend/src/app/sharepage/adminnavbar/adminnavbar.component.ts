import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent {
  isadminnavbar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the router events to detect navigation changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and set isNavbarVisible accordingly
        this.isadminnavbar = this.shouldShowNavbar();
      }
    });
  }

  shouldShowNavbar(): boolean {
    // Get the current route URL
    const currentRoute = this.router.url;

    // Check if the current route is one of the pages where the navbar should be visible
    return (
      currentRoute.includes('vaccineadministration') ||
      currentRoute.includes('dashboard') ||
      currentRoute.includes('logout') ||
      currentRoute.includes('familybookedslot') ||
      currentRoute.includes('familybooking') ||
      currentRoute.includes('userprofile') ||
      
      currentRoute.includes('userbookedslot') ||
      currentRoute.includes('vaccinehistory') ||
      currentRoute.includes('available-vaccine') ||
      currentRoute.includes('certificate')
    );
  }
}




