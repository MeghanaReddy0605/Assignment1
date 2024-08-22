import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

interface ProcessedEmployee {
  name: string;
  totalTime: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: true
})
export class ChartComponent implements OnChanges {
  @Input() processedEmployees: ProcessedEmployee[] = [];

  chart: any;

  ngOnChanges(): void {
    if (this.processedEmployees.length > 0) {
      this.createChart();
    } else {
      console.log("No processed employees data available to create chart.");
    }
  }

  createChart(): void {
    const data = this.processedEmployees.map(emp => emp.totalTime);
    const labels = this.processedEmployees.map(emp => emp.name);
    if (this.chart) {
      this.chart.destroy(); 
    }
    this.chart = new Chart('myChart', {
      type: 'pie',
      data: {
        datasets: [{
          label: 'Total Hours Worked',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }],
        labels
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom', 
          }
        }
      }
    });
  }
}
