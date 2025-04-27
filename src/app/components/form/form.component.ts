import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-form',
  imports: [
    RouterModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private dataService = inject(DataService);
  
  feedForm = new FormGroup({
    feeds: new FormArray([])
  });

  get feeds() {
    return this.feedForm.get('feeds') as FormArray;
  }

  addFeed() {
    const feedGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required])
    });

    this.feeds.push(feedGroup);
    // Focus the first input of the new feed group
    setTimeout(() => {
      const inputs = document.querySelectorAll('input');
      if (inputs.length > 0) {
        inputs[inputs.length - 3].focus();
      }
    });
  }

  removeFeed(index: number) {
    this.feeds.removeAt(index);
  }

  submitForm() {
    if (this.feedForm.valid) {
      const feeds = this.feeds.value;
      feeds.forEach((feed: any) => {
        this.dataService.addRss(feed.name, feed.url);
      });
      this.feedForm.reset();
      this.feeds.clear();
    }
  }
}
