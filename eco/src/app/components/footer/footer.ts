import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  ecoStats = {
    totalUsers: '2,847',
    co2Saved: '15.7',
    itemsExchanged: '8,932',
    activeExchanges: '1,234'
  };

  footerLinks = {
    platform: [
      { name: 'Cómo funciona', href: '/como-funciona' },
      { name: 'Publicar intercambio', href: '/publicar' },
      { name: 'Buscar cerca', href: '/buscar' },
      { name: 'Calculadora de impacto', href: '/calculadora' }
    ],
    community: [
      { name: 'Comunidad', href: '/comunidad' },
      { name: 'Eventos locales', href: '/eventos' },
      { name: 'Historias de éxito', href: '/historias' },
      { name: 'Blog sostenible', href: '/blog' }
    ],
    support: [
      { name: 'Centro de ayuda', href: '/ayuda' },
      { name: 'Términos de uso', href: '/terminos' },
      { name: 'Política de privacidad', href: '/privacidad' },
      { name: 'Contacto', href: '/contacto' }
    ],
    social: [
      { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
      { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
      { name: 'WhatsApp', href: 'https://whatsapp.com', icon: 'whatsapp' }
    ]
  };

  onNewsletterSubmit(email: string) {
    if (email) {
      console.log('Newsletter subscription:', email);
      // Aquí implementarías la lógica de suscripción
    }
  }

  onSocialClick(platform: string) {
    console.log('Social media click:', platform);
    // Aquí podrías añadir tracking de analytics
  }
}