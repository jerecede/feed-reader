import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'feed-reader';

  dataServ = inject(DataService);

  constructor(){
    this.dataServ.addRss('IlSecolo','https://www.ilsecoloxix.it/genova/rss');
    this.dataServ.addRss('anime');
  }
}
