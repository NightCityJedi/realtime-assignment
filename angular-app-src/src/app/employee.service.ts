import { Injectable, Signal, signal, WritableSignal, computed, OnDestroy } from '@angular/core';
import Employee from './employee';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeService {
  public employees: WritableSignal<Employee[]> = signal(new Array<Employee>());
  public editEmployee: WritableSignal<Employee> = signal(new Employee('','', new Date(), new Date(), 0));
  public previousEmployees: Signal<Employee[]>;
  public currentEmployees: Signal<Employee[]>;
  public formType: WritableSignal<string> = signal('add');
  
  constructor(private myRouter: Router) { 
    this.previousEmployees = computed(() => {
      return this.employees().filter((employee) => employee.endAt !== null);
    })
    this.currentEmployees = computed(() => {
      return this.employees().filter((employee) => employee.endAt === null);
    })
  }

  public navigateToEditForm(): void {
    this.formType.set('edit');
    this.myRouter.navigate(["/add-employee"]);
  }

  public closeForm(): void {
    this.formType.set('add');
  }


}
