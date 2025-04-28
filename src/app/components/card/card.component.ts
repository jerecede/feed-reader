import { Component, inject, Input, signal } from '@angular/core';
import { Item } from '../../models/item';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  dataServ = inject(DataService);

  @Input() itemCard!: Item;

  get currentStyles() {
    return {
      'color': this.itemCard.isFavorite ? 'crimson' : 'grey'
    };
  }

  //sto sbagliando logica
  toggleFavorite(){
    this.itemCard.isFavorite = !this.itemCard.isFavorite;
    this.dataServ.toggleFavoriteItem(this.itemCard);
  }

  openLink(){
    window.open(this.itemCard.link, '_blank');
  }

  shareLink(){
    if (navigator.share) {
      navigator.share({
        title: this.itemCard.title,
        text: 'Guarda questa notizia interessante!',
        url: this.itemCard.link
      }).then(() => {
        console.log('Condiviso con successo!');
      }).catch((error) => {
        console.error('Errore nella condivisione', error);
      });
    } else {
      console.log('La condivisione non è supportata su questo browser.');
    }
  }
}
