import { Component, OnInit } from '@angular/core';
import { EmployeedataService } from '../employeedata.service';
import { TableDataService } from '../tabledata.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../sharedModule';
import { ChartComponent } from '../chart/chart.component';

interface TimeEntry {
  EndTimeUtc: string;
  EntryNotes?: string;
  StarTimeUtc: string;
}

interface Employee {
  EmployeeName: string;
  timeEntries: TimeEntry[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule,ChartComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private employeeService: EmployeedataService,
    private tableDataService: TableDataService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      console.log('API data:', data);
      const employeeMap = new Map<string, Employee>();
      data.forEach((entry: any) => {
        const employeeName = entry.EmployeeName;
        if (!employeeMap.has(employeeName)) {
          employeeMap.set(employeeName, { EmployeeName: employeeName, timeEntries: [] });
        }
        employeeMap.get(employeeName)?.timeEntries.push(entry);
      });
      this.employees = Array.from(employeeMap.values()).map(emp => {
        const totalTime = this.calculateTotalTime(emp);
        return {
          name: emp.EmployeeName,
          totalTime: totalTime
        };
      });
      console.log('Processed employees:', this.employees);
      this.employees.sort((a, b) => b.totalTime - a.totalTime);
      const namesSet = new Set(this.employees.map(emp => emp.name));
      this.tableDataService.setDisplayedNames(namesSet);
    });
  }

  calculateTotalTime(employee: Employee): number {
    let totalHours = 0;
    const timeEntries = employee.timeEntries || [];
    timeEntries.forEach((entry: TimeEntry) => {
      const startTime = new Date(entry.StarTimeUtc);
      const endTime = new Date(entry.EndTimeUtc);
      if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime()) && endTime > startTime) {
        const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        totalHours += duration;
      } else {
        console.log('Invalid or incorrect date range:', entry.StarTimeUtc, entry.EndTimeUtc);
      }
    });

    return totalHours;
  }
}
