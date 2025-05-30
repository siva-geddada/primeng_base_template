import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-side-nav',
    imports: [RouterLink],
    templateUrl: './sideNav.component.html',
    styleUrls: ['./sideNav.component.scss'],
})
export class SideNavComponent {
  menuItems = [
    { label: 'Home', icon: 'home', route: '/home' },
    { label: 'Profile', icon: 'person', route: '/profile' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Help', icon: 'help', route: '/help' },
  ];
}
