import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Firestore,
  doc,
  getDoc,
  collection,
  collectionData,
  addDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

interface MarketplaceItem {
  id?: string;
  title: string;
  description: string;
  owner: string;
  ecoPoints: number;
  location: string;
  category: string;
  type: string;
  createdAt: Date;
}

@Component({
  selector: 'app-intercambio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './intercambio.html',
  styleUrls: ['./intercambio.scss'],
})
export class IntercambioComponent implements OnInit {
  productoDestinoId!: string;
  productoDestino?: MarketplaceItem;
  misProductos$!: Observable<MarketplaceItem[]>;

  comentario: string = '';
  valoracion: number = 5;
  productoOfrecidoId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.productoDestinoId = this.route.snapshot.paramMap.get('id') || '';

    if (this.productoDestinoId) {
      const docRef = doc(this.firestore, 'productos', this.productoDestinoId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.productoDestino = docSnap.data() as MarketplaceItem;
        this.productoDestino.id = docSnap.id;
      }
    }

    const currentUser = this.authService.currentUser;
    if (currentUser) {
      const productosPropiosCollection = collection(this.firestore, 'productos');
      const q = query(productosPropiosCollection, where('owner', '==', currentUser.uid));
      this.misProductos$ = collectionData(q, { idField: 'id' }) as Observable<MarketplaceItem[]>;
    }
  }

  async enviarIntercambio() {
    if (!this.productoOfrecidoId) {
      alert('Selecciona un producto propio para ofrecer en intercambio.');
      return;
    }

    if (!this.productoDestino) {
      alert('Producto destino no cargado.');
      return;
    }

    const currentUser = this.authService.currentUser;
    if (!currentUser) {
      alert('Debes iniciar sesión para intercambiar.');
      return;
    }

    const intercambiosCollection = collection(this.firestore, 'intercambios');

    await addDoc(intercambiosCollection, {
      productoDestinoId: this.productoDestinoId,
      productoDestinoTitulo: this.productoDestino.title,
      productoOfrecidoId: this.productoOfrecidoId,
      usuarioSolicitanteId: currentUser.uid,
      usuarioSolicitanteEmail: currentUser.email,
      comentario: this.comentario,
      valoracion: this.valoracion,
      estado: 'pendiente',
      creadoEn: new Date(),
    });

    alert('Solicitud de intercambio enviada con éxito.');
    this.router.navigate(['/marketplace']);
  }
}
