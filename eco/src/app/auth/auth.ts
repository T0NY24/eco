import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  age: number | null = null;
  occupation: string = '';
  errorMessage: string = '';
  isLoginMode: boolean = true;

  loading: boolean = false; 

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    try {
      if (this.isLoginMode) {
        await this.login();
      } else {
        await this.register();
      }
    } finally {
      this.loading = false;
    }
  }

  async register() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      const userRef = doc(this.firestore, `usuarios/${user.uid}`);
      await setDoc(userRef, {
        uid: user.uid,
        email: this.email,
        name: this.name,
        age: this.age,
        occupation: this.occupation,
        createdAt: new Date()
      });

      this.router.navigate(['/marketplace']);
    } catch (error: any) {
      console.error('Registration error:', error);
      this.errorMessage = error.message;
    }
  }

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/marketplace']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage = error.message;
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }
}
