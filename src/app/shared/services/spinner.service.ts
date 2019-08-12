import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {

  constructor() { }

  private readonly loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toggle(spin: boolean) {
    this.loading$.next(spin);
  }

  subscribe(next?: (value: boolean) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.loading$.subscribe(next, error, complete);
  }
}
