import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface MarketplaceItem {
  id: string;
  title: string;
  category: string;
  type: 'objeto' | 'servicio' | 'tiempo';
  owner: string;
  location: string;
  description: string;
  ecoPoints: number;
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
  newItem: Partial<MarketplaceItem> = {};

  categories = [
    { id: 'electronica', name: 'Electrónicos' },
    { id: 'hogar', name: 'Hogar' },
    { id: 'libros', name: 'Libros' },
    { id: 'servicios', name: 'Servicios' },
    { id: 'habilidades', name: 'Habilidades' },
    { id: 'deportes', name: 'Deportes' },
    { id: 'musica', name: 'Música' }
  ];

  constructor(private firestore: Firestore, private route: ActivatedRoute) {
    const productsCollection = collection(this.firestore, 'productos');
    this.items$ = collectionData(productsCollection, { idField: 'id' }) as Observable<MarketplaceItem[]>;
  }

  ngOnInit(): void {}

  async addItem() {
    if (!this.newItem.title || !this.newItem.owner || !this.newItem.description || !this.newItem.category || !this.newItem.type) {
      alert('Por favor llena todos los campos.');
      return;
    }

    const productsCollection = collection(this.firestore, 'productos');
    await addDoc(productsCollection, {
      ...this.newItem,
      ecoPoints: this.newItem.ecoPoints || 0,
      location: this.newItem.location || '',
      createdAt: new Date()
    });

    this.newItem = {}; // Reset form
  }
}
