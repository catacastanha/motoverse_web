import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuAbertoSubject = new BehaviorSubject<boolean>(false);
  menuAberto$ = this.menuAbertoSubject.asObservable();

  constructor() {}

  toggleMenu() {
    this.menuAbertoSubject.next(!this.menuAbertoSubject.value);
  }

  getMenuState(): boolean {
    return this.menuAbertoSubject.value;
  }
} 