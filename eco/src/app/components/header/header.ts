import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  searchQuery = '';
  
  isAuthenticated = false; // Luego lo conectaremos a Firebase Auth.

  userStats = {
    ecoPoints: 120,
    avatar: 'https://via.placeholder.com/40',
    level: 'Lv.5'
  };

  navigationItems = [
    { label: 'Inicio', route: '/', active: true },
    { label: 'Marketplace', route: '/marketplace', active: false },
    { label: 'Servicios', route: '/marketplace/servicios', active: false }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch() {
    console.log('Buscando:', this.searchQuery);
  }

  onPublish() {
    console.log('Publicar nuevo objeto');
  }
}
