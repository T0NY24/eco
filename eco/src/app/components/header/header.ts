import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  searchQuery = '';
  isMenuOpen = false;
  
  navigationItems = [
    { label: 'Inicio', route: '/', active: true },
    { label: 'Marketplace', route: '/marketplace', active: false },
    { label: 'Mis Intercambios', route: '/exchanges', active: false },
    { label: 'Comunidad', route: '/community', active: false }
  ];

  userStats = {
    ecoPoints: 1250,
    level: 'Eco Warrior',
    avatar: '/assets/images/default-avatar.svg'
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Aquí implementarías la lógica de búsqueda
    }
  }

  onPublish() {
    console.log('Opening publish dialog');
    // Aquí implementarías la lógica para publicar nuevo item
  }
}