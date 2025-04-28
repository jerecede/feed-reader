import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite',
  imports: [CommonModule, CardComponent, RouterModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  dataServ = inject(DataService);
}
