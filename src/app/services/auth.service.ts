import { Injectable } from '@angular/core';
import { getApps, initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth: firebaseAuth.Auth;

  constructor() {
    // Garante inicializacao unica mesmo em testes e hot reload.
    if (!getApps().length) {
      initializeApp(environment.firebaseConfig);
    }

    this.auth = firebaseAuth.getAuth();
  }

  register(email: string, password: string) {
    return firebaseAuth.createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
  }

  login(email: string, password: string) {
    return firebaseAuth.signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return firebaseAuth.signOut(this.auth);
  }

  onAuthStateChanged(callback: (user: firebaseAuth.User | null) => void) {
    return firebaseAuth.onAuthStateChanged(this.auth, callback);
  }

  getAuthStateOnce(): Promise<firebaseAuth.User | null> {
    return new Promise((resolve) => {
      const unsubscribe = this.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  obterPerfilUsuario() {
    const auth = firebaseAuth.getAuth();
    const usuario = auth.currentUser;

    if (usuario && usuario.email) {
      const email = usuario.email;

      // O split('@') divide o email em duas partes e pega a primeira [0]
      const parteNome = email.split('@')[0];

      // Deixa a primeira letra maiúscula para ficar mais bonito no perfil
      const nomeFormatado =
        parteNome.charAt(0).toUpperCase() + parteNome.slice(1);

      return { nome: nomeFormatado, email: email };
    }

    return { nome: 'Usuário', email: 'Carregando...' };
  }

  recuperarSenha(email: string) {
    return firebaseAuth.sendPasswordResetEmail(this.auth, email);
  }
}
