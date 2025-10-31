import { Component } from '@angular/core';
import { JobApplicationComponent } from './job-application/job-application.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ReactiveFormsModule, JobApplicationComponent],
  template: `<app-job-application></app-job-application>`
})
export class AppComponent {
  title = 'desafio-angular';
}
