import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject = new BehaviorSubject<'all' | 'completed' | 'pending'>('all');
  filter$ = this.filterSubject.asObservable();

  constructor() {}

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filterSubject.next(filter);
  }
}
