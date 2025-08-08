import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  Firestore,
  collection,
  collectionData,
  getCountFromServer,
  query,
  where,
  orderBy,
  limit,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent implements OnInit {
  stats = {
    totalUsers: '...',
    activeExchanges: '...',
    co2Saved: '---',       // Puedes agregar cálculo o mantener estático
    itemsExchanged: '...',
  };

  features = [
    {
      icon: 'recycle',
      title: 'Intercambio Circular',
      description: 'Intercambia objetos, servicios y habilidades de manera sostenible',
      color: 'green',
    },
    {
      icon: 'users',
      title: 'Comunidad Local',
      description: 'Conecta con vecinos de Zamora y fortalece lazos comunitarios',
      color: 'blue',
    },
    {
      icon: 'leaf',
      title: 'Impacto Ambiental',
      description: 'Reduce residuos y contribuye a un planeta más sostenible',
      color: 'purple',
    },
    {
      icon: 'award',
      title: 'Gamificación',
      description: 'Gana eco-puntos y reconocimientos por cada intercambio',
      color: 'orange',
    },
  ];

  testimonials$: Observable<any[]> = of([]);

  recentActivities$: Observable<any[]> = of([]);

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.loadStats();
    this.loadTestimonials();
    this.loadRecentActivities();
  }

  async loadStats() {
    try {
      const usuariosCol = collection(this.firestore, 'usuarios');
      const usuariosSnap = await getCountFromServer(usuariosCol);

      const intercambiosCol = collection(this.firestore, 'intercambios');
      const intercambiosPendientesQ = query(intercambiosCol, where('estado', '==', 'pendiente'));
      const intercambiosSnap = await getCountFromServer(intercambiosPendientesQ);

      const productosCol = collection(this.firestore, 'productos');
      const productosSnap = await getCountFromServer(productosCol);

      this.stats = {
        totalUsers: usuariosSnap.data().count.toLocaleString(),
        activeExchanges: intercambiosSnap.data().count.toLocaleString(),
        co2Saved: '15.7 toneladas', // Ejemplo fijo o calcula aquí
        itemsExchanged: productosSnap.data().count.toLocaleString(),
      };
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      this.stats = {
        totalUsers: '---',
        activeExchanges: '---',
        co2Saved: '---',
        itemsExchanged: '---',
      };
    }
  }

  loadTestimonials() {
    const comentariosCol = collection(this.firestore, 'comentarios');
    this.testimonials$ = collectionData(comentariosCol, { idField: 'id' }).pipe(
      map((comments) =>
        comments.map((c: any) => ({
          name: c.name || 'Usuario Anónimo',
          role: c.role || '',
          content: c.text || c.comentario || '',
          avatar: c.avatar || '/assets/images/avatar-default.jpg',
          ecoPoints: c.ecoPoints || 0,
        }))
      ),
      catchError((err) => {
        console.error('Error cargando testimonios:', err);
        return of([]);
      })
    );
  }

  loadRecentActivities() {
    const intercambiosCol = collection(this.firestore, 'intercambios');
    const recentQuery = query(intercambiosCol, orderBy('creadoEn', 'desc'), limit(5));

    this.recentActivities$ = collectionData(recentQuery, { idField: 'id' }).pipe(
      map((items) =>
        items.map((item: any) => ({
          type: 'exchange',
          user: item.usuarioSolicitanteEmail || 'Anónimo',
          action: `solicitó intercambio: ${item.productoDestinoTitulo}`,
          time: item.creadoEn?.toDate
            ? item.creadoEn.toDate().toLocaleString()
            : new Date().toLocaleString(),
          impact: 'Pendiente',
        }))
      ),
      catchError((err) => {
        console.error('Error cargando actividades recientes:', err);
        return of([]);
      })
    );
  }

  startExchanging(): void {
    console.log('Redirigiendo al marketplace...');
  }

  learnMore(): void {
    console.log('Mostrando sección de más información...');
  }
}
