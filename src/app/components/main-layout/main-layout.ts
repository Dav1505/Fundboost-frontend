import {Component, inject} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Keycloak from 'keycloak-js';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  navLinks = [
    { path: '/projects', label: 'Progetti', icon: 'list' },
    { path: '/projects/my-projects', label: 'I miei progetti', icon: 'folder' },
    { path: '/projects/create', label: 'Crea progetto', icon: 'add_circle' },
    { path: '/wallet', label: 'Wallet', icon: 'account_balance_wallet' },
  ];

  private readonly keycloak = inject(Keycloak);

  logout(): void{
    this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }
}
