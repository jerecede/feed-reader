import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';

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
  private router = inject(Router);
  
  feedForm = new FormGroup({
    feeds: new FormArray([])
  });

  get feeds() {
    return this.feedForm.get('feeds') as FormArray;
  }

  addFeed() {
    const feedGroup = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      url: new FormControl('')
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

  canSave(): boolean {
    if (this.feeds.length === 0) {
      return false;
    }
    
    return this.feeds.controls.every(feedGroup => {
      const group = feedGroup as FormGroup;
      const name = group.get('name')?.value;
      const type = group.get('type')?.value;
      const url = group.get('url')?.value;
      
      return name && name.trim() !== '' && 
             type && type.trim() !== '' && 
             url && url.trim() !== '';
    });
  }

  submitForm() {
    if (this.canSave()) {
      const feeds = this.feeds.value;
      feeds.forEach((feed: any) => {
        this.dataService.addRss(feed.name, feed.url);
      });
      this.feedForm.reset();
      this.feeds.clear();
      this.router.navigate(['/']);
    }
  }
}
