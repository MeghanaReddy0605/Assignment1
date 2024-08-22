import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private displayedNames = new BehaviorSubject<Set<string>>(new Set());

  setDisplayedNames(names: Set<string>): void {
    this.displayedNames.next(names);
  }

  getDisplayedNames() {
    return this.displayedNames.asObservable();
  }
}
