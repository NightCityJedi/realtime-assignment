import { Injectable, OnDestroy } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Employee from './employee';
import { EmployeeService } from './employee.service';
import { IndexDatabaseService } from './index-database.service';

@Injectable()
export class EmployeeFormService{
  public form: WritableSignal<FormGroup> = signal(new FormGroup(''));
  public readonly startDateStrings: string[] = ['today', 'tomorrow', 'Next Monday', 'Next Tuesday'];
  public readonly endDateStrings: string[] = ['today', 'No Date'];

  constructor(private myEmployeeService: EmployeeService, private myDatabaseService: IndexDatabaseService) { 

  }

  public Form(): void {
    if (this.isFormAdd()) {
      this.newForm();
    } else {
      this.editForm();
    }
  }



  public SaveForm(): void {
    if (this.isFormAdd()) {
      this.myDatabaseService.addEmployee(this.form().value);
    }
    else {
      this.myDatabaseService.saveEditEmployee(this.form().value);
    }
  }

  private isFormAdd(): boolean {
    return this.myEmployeeService.formType() === 'add'
  }

  private newForm(): void {
    this.form.set(this.getFormGroup());
  }

  private getFormGroup(): FormGroup {
    return new FormGroup({
      employeeName: new FormControl(''),
      role: new FormControl(''),
      startAt: new FormControl(new Date(Date.now())),
      endAt: new FormControl(null)
    });
  }

  private editForm(): void {
    const employee: Employee = this.myEmployeeService.editEmployee();
    this.form.set(new FormGroup({
      employeeName: new FormControl(employee.employeeName),
      role: new FormControl(employee.role),
      startAt: new FormControl(employee.startAt),
      endAt: new FormControl(employee.endAt),
      key: new FormControl(employee.key)
    }))
  }
}
