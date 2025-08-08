import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, where, updateDoc, doc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule], // Para *ngIf y *ngFor
  templateUrl: './ofertas.html',
  styleUrls: ['./ofertas.scss']
})
export class OfertasComponent implements OnInit {
  ofertas$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit(): void {
    this.ofertas$ = user(this.auth).pipe(
      switchMap((usuario) => {
        if (!usuario) return from(Promise.resolve([]));
        const productosRef = collection(this.firestore, 'productos');
        // <-- Cambié 'usuarioId' por 'owner'
        const q = query(productosRef, where('owner', '==', usuario.uid));
        return from(getDocs(q)).pipe(
          switchMap((snap) => {
            const misProductosIds = snap.docs.map(doc => doc.id);
            if (misProductosIds.length === 0) return from(Promise.resolve([]));
            const intercambiosRef = collection(this.firestore, 'intercambios');
            const intercambiosQ = query(intercambiosRef, where('productoDestinoId', 'in', misProductosIds));
            return from(getDocs(intercambiosQ)).pipe(
              switchMap((intercambiosSnap) =>
                from(Promise.resolve(intercambiosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
              )
            );
          })
        );
      })
    );
  }

  aceptarOferta(id: string) {
    const docRef = doc(this.firestore, 'intercambios', id);
    updateDoc(docRef, { estado: 'aceptado' });
  }

  rechazarOferta(id: string) {
    const docRef = doc(this.firestore, 'intercambios', id);
    updateDoc(docRef, { estado: 'rechazado' });
  }
}
