import { Component, inject, signal } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuService } from '../../services/menu/menu.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  menuServ = inject(MenuService);
  dataServ = inject(DataService);
}