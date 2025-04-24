import { Component } from '@angular/core';
import { ListComponent } from "../list/list.component";
import { MainComponent } from "../main/main.component";

@Component({
  selector: 'app-home',
  imports: [ListComponent, MainComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
