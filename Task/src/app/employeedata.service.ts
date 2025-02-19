import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
 
})
export class EmployeedataService {

  private key = 'vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';
  private apiUrl = `https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=${encodeURIComponent(this.key)}`;

  constructor(private http: HttpClient) { }
  
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
