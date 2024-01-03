import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
      currentRoute.includes('userlogin') ||
      currentRoute.includes('userregistration') ||
      currentRoute.includes('about') ||
      currentRoute.includes('contact') ||
      currentRoute.includes('adminlogin') ||
      currentRoute.includes('home') ||
      currentRoute.includes('userresetpass')
      
    );
  }
}
