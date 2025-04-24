import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  isOpen = signal(false);

  changeMenu(){
    this.isOpen.set(!this.isOpen());
  }
}
