import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { IndexDatabaseService } from '../index-database.service';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import Employee from '../employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public myEmployeeService: EmployeeService, private myDatabaseService: IndexDatabaseService, private myRouter: Router, private snackBar: MatSnackBar) {
    this.myDatabaseService.dbInstanceCreated.subscribe(() =>{
      this.onDatabaseInstance();
    })
  }

  private onDatabaseInstance(): void {
    this.myDatabaseService.UpdateEmployees();
  }

  public handleDragEnded(employee: Employee) {
    this.myDatabaseService.removeEmployee(employee.key);
    this.showDeletedEmployeeSnackBar(employee);
  }

  private showDeletedEmployeeSnackBar(employee: Employee): void {
    const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open('Employee data has been deleted', 'Undo', {duration: 3000});
    snackBarRef.onAction().subscribe(() => {
      this.myDatabaseService.saveEditEmployee(employee);
    })
  }

  public hasEmployees(): boolean {
    return this.myEmployeeService.employees().length > 0;
  }

  public handleEditClick(employee: Employee): void {
    this.myDatabaseService.getEditEmployee(employee.key);
  }

}
