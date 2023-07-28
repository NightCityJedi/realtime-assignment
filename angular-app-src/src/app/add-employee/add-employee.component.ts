import { Component, OnInit } from '@angular/core';
import { EmployeeFormService } from '../employee-form.service';
import Role from '../role';
import { IndexDatabaseService } from '../index-database.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import Employee from '../employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [EmployeeFormService]
})
export class AddEmployeeComponent implements OnInit {
  public readonly roles: Role[] = new Array<Role>();
  public readonly start: string = 'start';
  public readonly end: string = 'end';

  constructor(public myEmployeeFormService: EmployeeFormService, private myDatabaseService: IndexDatabaseService, private router: Router, public myEmployeeService: EmployeeService, private snackBar: MatSnackBar){
  }

  ngOnInit(): void {
      this.addRoles();
      this.myEmployeeFormService.Form();
  }

  private addRoles(): void {
    this.roles.push(new Role('product-designer', 'Product Designer'));
    this.roles.push(new Role('flutter-developer', 'Flutter Developer'));
    this.roles.push(new Role('qa-tester', 'QA Tester'));
  }

  onSave(): void {
    this.myEmployeeFormService.SaveForm();
    this.myEmployeeService.closeForm();
    this.router.navigate(["/"]);
  }

  onCancel(): void {
    this.myEmployeeService.closeForm();
    this.router.navigate(["/"]);
  }

  handleDelete(): void {
    const employee: Employee = this.myEmployeeFormService.form().value;
    this.myDatabaseService.removeEmployee(employee.key);
    this.router.navigate(["/"]);
    const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open('Employee data has been deleted', 'Undo', {duration: 3000});
    snackBarRef.onAction().subscribe(() => {
      this.myDatabaseService.saveEditEmployee(employee);
      this.router.navigate(["/"]);
    })
  }

}
