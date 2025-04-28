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

  dataServ = inject(DataService);

  constructor(){
    // this.dataServ.addRss('IlSecolo','https://www.ilsecoloxix.it/genova/rss');
    // this.dataServ.addRss('IlSecolo2','https://www.ilsecoloxix.it/levante/rss');
  }

  ngOnInit(){
    this.dataServ.setup();
    console.log("nasco");
  }
}
