import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MarketplaceItem } from '../marketplace/marketplace';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getItems(): Observable<MarketplaceItem[]> {
    const itemsRef = collection(this.firestore, 'productos');
    return collectionData(itemsRef, { idField: 'id' }) as Observable<MarketplaceItem[]>;
  }

  addItem(item: Omit<MarketplaceItem, 'id'>): Promise<void> {
    const itemsRef = collection(this.firestore, 'productos');
    return addDoc(itemsRef, item).then(() => {});
  }
}
