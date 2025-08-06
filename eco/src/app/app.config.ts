import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(), provideFirebaseApp(() => initializeApp({ projectId: "reciclaje-d8a55", appId: "1:399736346703:web:1f48caf8601c23ff3ef23a", storageBucket: "reciclaje-d8a55.firebasestorage.app", apiKey: "AIzaSyC3SWjQRQGiJIUIrGZQfJ8rU6MEjcsxjuM", authDomain: "reciclaje-d8a55.firebaseapp.com", messagingSenderId: "399736346703" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};