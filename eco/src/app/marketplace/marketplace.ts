import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export interface MarketplaceItem {
  id?: string;
  title: string;
  category: string;
  type: 'objeto' | 'servicio' | 'tiempo';
  owner: string; // Nombre del usuario
  location: string;
  ecoPoints: number;
  description: string;
  createdAt: Date;
}

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marketplace.html',
  styleUrls: ['./marketplace.scss']
})
export class MarketplaceComponent implements OnInit {
  items$: Observable<MarketplaceItem[]>;
  isPublishing: boolean = false;
  loading: boolean = true;
  skeletonArray = Array(6); // 6 tarjetas simuladas
  newItem: Partial<MarketplaceItem> = {};

  categories = [
    { id: 'electronica', name: 'Electrónicos' },
    { id: 'hogar', name: 'Hogar' },
    { id: 'libros', name: 'Libros' },
    { id: 'servicios', name: 'Servicios' },
    { id: 'habilidades', name: 'Habilidades' },
    { id: 'deportes', name: 'Deportes' },
    { id: 'musica', name: 'Música' },
  ];

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) {
    const productsCollection = collection(this.firestore, 'productos');
    this.items$ = collectionData(productsCollection, { idField: 'id' }) as Observable<MarketplaceItem[]>;
  }

  ngOnInit(): void {
    // Simular carga de productos
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  async addItem() {
    if (!this.newItem.title || !this.newItem.description || !this.newItem.category || !this.newItem.type) {
      alert('Por favor llena todos los campos.');
      return;
    }

    if (!this.authService.currentUser) {
      alert('Debes iniciar sesión para publicar productos.');
      return;
    }

    // Obtener datos completos del usuario (nombre)
    const userData: any = await firstValueFrom(this.authService.getUserData());
    if (!userData) {
      alert('No se pudo obtener información del usuario.');
      return;
    }

    const productsCollection = collection(this.firestore, 'productos');
    await addDoc(productsCollection, {
      ...this.newItem,
      owner: userData.name, // <-- Guardamos nombre en lugar de UID
      ecoPoints: this.newItem.ecoPoints || 0,
      location: this.newItem.location || '',
      createdAt: new Date()
    });

    this.newItem = {};
    this.isPublishing = false;
  }

  // Método para ir al intercambio con el producto seleccionado
  irAIntercambio(productoId: string) {
    this.router.navigate(['/intercambio', productoId]);
  }
}
