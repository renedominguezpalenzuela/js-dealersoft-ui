import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  setLoading = (loading: boolean): void => this.loadingSub.next(loading);
}
