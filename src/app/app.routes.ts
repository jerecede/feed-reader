import { Routes } from '@angular/router';
import { HomeDetailComponent } from './components/home-detail/home-detail.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'details/:id',
        component: HomeDetailComponent,
        title: 'Home details'
    }
];
