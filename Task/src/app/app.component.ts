import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './sharedModule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,ChartComponent,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task';
}
