import { Routes } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component';
import {LabsComponent} from './Pages/labs/labs.component';

export const routes: Routes = 
[
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'labs', 
        component: LabsComponent
    }
];
