import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3SWjQRQGiJIUIrGZQfJ8rU6MEjcsxjuM",
  authDomain: "reciclaje-d8a55.firebaseapp.com",
  projectId: "reciclaje-d8a55",
  storageBucket: "reciclaje-d8a55.firebasestorage.app",
  messagingSenderId: "399736346703",
  appId: "1:399736346703:web:1f48caf8601c23ff3ef23a"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    // Inicialización de Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};