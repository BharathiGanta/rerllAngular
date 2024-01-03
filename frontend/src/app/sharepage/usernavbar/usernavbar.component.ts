import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent {

  isNavbarVisible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the router events to detect navigation changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and set isNavbarVisible accordingly
        this.isNavbarVisible = this.shouldShowNavbar();
      }
    });
  }

 
  shouldShowNavbar(): boolean {
    // Get the current route URL
    const currentRoute = this.router.url;

    // Check if the current route is one of the pages where the navbar should be visible
    return (
      currentRoute.includes('Bookvaccineslot') ||
      currentRoute.includes('userprofile') ||
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


