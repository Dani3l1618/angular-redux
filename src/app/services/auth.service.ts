import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private fireStore = inject(Firestore);

  constructor() {}

  initAuthListener() {
    authState(this.auth).subscribe((fuser) => {
      console.log(fuser);
    });
  }

  createUser(nombre: string, email: string, password: string) {
    // console.log({ nombre, email, password });
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email ?? email);
        const documentRef = doc(this.fireStore, `${user.uid}/usuario`);
        return setDoc(documentRef, { ...newUser });
      }
    );
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return authState(this.auth).pipe(map((fuser) => fuser !== null));
  }
}
