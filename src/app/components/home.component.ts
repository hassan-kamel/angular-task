import { Component } from '@angular/core';
import { CoursesComponent } from './courses.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoursesComponent],
  template: ` <app-courses></app-courses> `,
  styles: ``,
})
export class HomeComponent {}
