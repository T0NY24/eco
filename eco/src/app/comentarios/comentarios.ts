import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  templateUrl: './comentarios.html',
  styleUrls: ['./comentarios.scss'],
  imports: [CommonModule, FormsModule],
})
export class ComentariosComponent {
  comentario = '';
  estrellas = 0;
  comentarios$: Observable<any[]>;

  constructor(public authService: AuthService, private firestore: Firestore) {
    const comentariosRef = collection(this.firestore, 'comentarios');
    this.comentarios$ = collectionData(comentariosRef, { idField: 'id' });
  }

  async enviarComentario() {
    if (!this.authService.currentUser) return;

    const { uid } = this.authService.currentUser;

    // Obtener los datos del usuario desde la colección 'usuarios'
    const userDocRef = doc(this.firestore, 'usuarios', uid);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.exists() ? userDocSnap.data() : null;

    const comentarioData = {
      texto: this.comentario,
      estrellas: this.estrellas,
      nombre: userData?.['name'] || 'Anónimo',
      uid,
      creadoEn: new Date()
    };

    const comentariosRef = collection(this.firestore, 'comentarios');
    await addDoc(comentariosRef, comentarioData);

    this.comentario = '';
    this.estrellas = 0;
  }
}
