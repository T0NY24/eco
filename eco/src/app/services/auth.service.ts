import { Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth, private firestore: Firestore) {
    authState(this.auth).subscribe(user => {
      this.currentUser = user;
    });
  }

  getUserData(): Observable<any> {
    if (!this.currentUser) return of(null);

    const userRef = doc(this.firestore, `usuarios/${this.currentUser.uid}`);
    return docData(userRef);
  }
    logout() {
    return this.auth.signOut();
  }

}
