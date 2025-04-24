import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from "../header/header.component";
import { MainComponent } from "../main/main.component";

@Component({
  selector: 'app-home',
  imports: [MatSidenavModule, HeaderComponent, MainComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
