import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionSnapshots,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  private fireStore = inject(Firestore);
  private store: Store<AppState> = inject(Store);

  private userId: string = '';
  private _userId$ = new BehaviorSubject<string>('');

  constructor() {
    this.store
      .select('auth')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.userId = user?.uid ?? '';
        this._userId$.next(this.userId);
      });
  }

  get userId$(): Observable<string> {
    return this._userId$.asObservable();
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const collectionRef = collection(
      this.fireStore,
      `${this.userId}/ingresos-egresos/items`
    );

    return addDoc(collectionRef, { ...ingresoEgreso });
  }

  initIngresoEgreoListener() {
    const collectionRef = collection(
      this.fireStore,
      `${this.userId}/ingresos-egresos/items`
    );
    const data = collectionSnapshots(collectionRef);
    return data.pipe(
      map((response) =>
        response.map((item) => ({ ...item.data(), uid: item.id }))
      )
    );
  }

  async deleteRegister(uid: string) {
    if (!this.userId) return;
    const documentRef = doc(
      this.fireStore,
      `${this.userId}/ingresos-egresos/items/${uid}`
    );

    try {
      await deleteDoc(documentRef);
      return true;
    } catch (e) {
      return false;
    }
  }
}
