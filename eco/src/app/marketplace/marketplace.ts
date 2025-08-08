import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export interface MarketplaceItem {
  id?: string;
  title: string;
  category: string;
  type: 'objeto' | 'servicio' | 'tiempo';
  owner: string; // Será el UID del usuario
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

  ngOnInit(): void {}

  async addItem() {
    if (!this.newItem.title || !this.newItem.description || !this.newItem.category || !this.newItem.type) {
      alert('Por favor llena todos los campos.');
      return;
    }

    const currentUser = this.authService.currentUser;
    if (!currentUser) {
      alert('Debes iniciar sesión para publicar productos.');
      return;
    }

    const productsCollection = collection(this.firestore, 'productos');
    await addDoc(productsCollection, {
      ...this.newItem,
      owner: currentUser.uid,  // Aquí guardamos el UID del usuario logueado
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
