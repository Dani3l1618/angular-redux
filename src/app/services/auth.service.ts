import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from '../app.reducer';
import { setUser, unsetUser } from '../auth/auth.actions';
import { unsetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private fireStore = inject(Firestore);
  private store: Store<AppState> = inject(Store);

  constructor() {}

  initAuthListener() {
    authState(this.auth).subscribe(async (fuser) => {
      if (fuser) {
        const docRef = doc(this.fireStore, `${fuser.uid}/usuario`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { name, uid, email } = docSnap.data();
          const user = new Usuario(uid, name, email);
          this.store.dispatch(setUser({ user }));
        }
      } else {
        this.store.dispatch(unsetUser());
        this.store.dispatch(unsetItems());
      }
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
