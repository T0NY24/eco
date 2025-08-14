import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  userName: string = ''; // Nombre del usuario
  loading: boolean = true; // Loader mientras se carga

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    // Esperamos a que currentUser se inicialice
    const checkUser = () => new Promise(resolve => {
      const interval = setInterval(() => {
        if (this.authService.currentUser !== null) {
          clearInterval(interval);
          resolve(this.authService.currentUser);
        }
      }, 50);
    });

    await checkUser();

    if (this.authService.currentUser) {
      try {
        const userData: any = await firstValueFrom(this.authService.getUserData());
        this.userName = userData?.name || this.authService.currentUser.email || '';
      } catch (error) {
        console.error('Error obteniendo datos del usuario:', error);
        this.userName = this.authService.currentUser.email || '';
      }
    }
    this.loading = false;
  }

  logout() {
    this.authService.logout();
  }
}
