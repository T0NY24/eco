import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';  // Importa NgIf junto con CommonModule
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, NgIf],  // Añade NgIf aquí
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.scss']
})
export class PerfilComponent {
  userData: any = null;

  constructor(public authService: AuthService) {
    this.authService.getUserData().subscribe(data => {
      this.userData = data;
    });
  }
}
