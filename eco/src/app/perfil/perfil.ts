import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.scss']
})
export class PerfilComponent {
  userData: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Simula un pequeño retraso para que el skeleton se vea
    setTimeout(() => {
      this.authService.getUserData().subscribe(data => {
        this.userData = data;
      });
    }, 1000);
  }
}
