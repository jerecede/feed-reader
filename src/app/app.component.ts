import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'feed-reader';

  // dataServ = inject(DataService);

  constructor(){
    // this.dataServ.addRss('IlSecolo','https://www.ilsecoloxix.it/genova/rss');
    // this.dataServ.addRss('IlSecolo2','https://www.ilsecoloxix.it/levante/rss');
  }

  //quando la component si rompe e anche quando si crea fare tutto false nelle isSelected
}
