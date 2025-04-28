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
import { CommonModule } from '@angular/common';

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
    MatSelectModule,
    CommonModule
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
      type: new FormControl('normal'),
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

  isDuplicateName(name: string, currentIndex: number): boolean {
    return this.feeds.controls.some((feedGroup, index) => {
      if (index === currentIndex) return false;
      const group = feedGroup as FormGroup;
      return group.get('name')?.value.toLowerCase() === name.toLowerCase();
    });
  }

  isDuplicateUrl(url: string, currentIndex: number): boolean {
    return this.feeds.controls.some((feedGroup, index) => {
      if (index === currentIndex) return false;
      const group = feedGroup as FormGroup;
      return group.get('url')?.value.toLowerCase() === url.toLowerCase();
    });
  }

  canSave(): boolean {
    if (this.feeds.length === 0) {
      return false;
    }
    
    return this.feeds.controls.every((feedGroup, index) => {
      const group = feedGroup as FormGroup;
      const name = group.get('name')?.value;
      const type = group.get('type')?.value;
      const url = group.get('url')?.value;
      
      // Check for empty fields
      if (!name || !type || !url || 
          name.trim() === '' || 
          url.trim() === '') {
        return false;
      }

      // Check for duplicates 
      if (this.isDuplicateName(name, index) || this.isDuplicateUrl(url, index)) {
        return false;
      }

      return true;
    });
  }

  submitForm() {
    if (this.canSave()) {
      const feeds = this.feeds.value;
      feeds.forEach((feed: any) => {
        const feedName = feed.name.toLowerCase();
        if (feed.type === 'reddit') {
          this.dataService.addRss(feedName, `https://www.reddit.com/r/${feed.url}/.rss`);
        } else {
          this.dataService.addRss(feedName, feed.url);
        }
      });
      this.feedForm.reset();
      this.feeds.clear();
      this.router.navigate(['/']);
    }
  }
}
