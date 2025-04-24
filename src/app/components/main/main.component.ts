import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-main',
  imports: [MatSidenavModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  menuServ = inject(MenuService);
}