import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent implements OnInit {
  stats = {
    totalUsers: '2,847',
    activeExchanges: '1,234',
    co2Saved: '15.7 toneladas',
    itemsExchanged: '8,932'
  };

  features = [
    {
      icon: 'recycle',
      title: 'Intercambio Circular',
      description: 'Intercambia objetos, servicios y habilidades de manera sostenible',
      color: 'green'
    },
    {
      icon: 'users',
      title: 'Comunidad Local',
      description: 'Conecta con vecinos de Zamora y fortalece lazos comunitarios',
      color: 'blue'
    },
    {
      icon: 'leaf',
      title: 'Impacto Ambiental',
      description: 'Reduce residuos y contribuye a un planeta más sostenible',
      color: 'purple'
    },
    {
      icon: 'award',
      title: 'Gamificación',
      description: 'Gana eco-puntos y reconocimientos por cada intercambio',
      color: 'orange'
    }
  ];

  testimonials = [
    {
      name: 'María González',
      role: 'Vecina de Zamora Centro',
      content: 'He intercambiado más de 20 objetos este año. Es increíble cómo la comunidad se ha unido.',
      avatar: '/assets/images/avatar-1.jpg',
      ecoPoints: 1250
    },
    {
      name: 'Carlos Mendoza',
      role: 'Profesor y Músico',
      content: 'Enseño guitarra a cambio de ayuda con jardinería. ¡Una experiencia fantástica!',
      avatar: '/assets/images/avatar-2.jpg',
      ecoPoints: 980
    },
    {
      name: 'Ana Rodríguez',
      role: 'Estudiante Universitaria',
      content: 'Encontré todos mis libros de carrera intercambiando objetos que ya no necesitaba.',
      avatar: '/assets/images/avatar-3.jpg',
      ecoPoints: 750
    }
  ];

  recentActivities = [
    {
      type: 'exchange',
      user: 'Pedro S.',
      action: 'intercambió una bicicleta por clases de programación',
      time: 'hace 2 horas',
      impact: '3.2 kg CO₂ ahorrados'
    },
    {
      type: 'service',
      user: 'Laura M.',
      action: 'ofreció reparación de electrodomésticos',
      time: 'hace 4 horas',
      impact: 'Productos salvados'
    },
    {
      type: 'skill',
      user: 'Diego R.',
      action: 'compartió conocimientos de jardinería urbana',
      time: 'hace 6 horas',
      impact: 'Conocimiento compartido'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes inicializar datos o hacer llamadas a APIs
  }

  startExchanging(): void {
    // Lógica para comenzar a intercambiar
    console.log('Redirecting to marketplace...');
  }

  learnMore(): void {
    // Lógica para mostrar más información
    console.log('Opening learn more section...');
  }
}