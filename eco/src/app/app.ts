import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router // 👈 Añadido para navegación
  ) {}

  title = 'EcoIntercambio';

  goToOfertas() {
    this.router.navigate(['/ofertas']); // 👈 Esto te lleva al componente Ofertas
  }
}
