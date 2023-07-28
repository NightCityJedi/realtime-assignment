import { Injectable } from '@angular/core';
import  Employee  from './employee';
import { EmployeeService } from './employee.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class IndexDatabaseService {
  private database!: IDBDatabase;

  private databaseInstanceCreated: ReplaySubject<void> = new ReplaySubject<void>();
  public dbInstanceCreated: Observable<void> = this.databaseInstanceCreated.asObservable();
  
  constructor(private myEmployeeService: EmployeeService) {
    this.openDatabase();
    
  }

  private openDatabase(): void {
    const openDatabaseRequest: IDBOpenDBRequest = window.indexedDB.open("employeeData");
    openDatabaseRequest.onerror = (event: any) => {
      console.log(event);
    }
    openDatabaseRequest.onsuccess = (event: any) => {
      this.database = event.target.result;
      this.databaseInstanceCreated.next();
    }
    this.createObjectStore(openDatabaseRequest);
  }

  private createObjectStore(openDatabaseRequest: IDBOpenDBRequest): void {
    openDatabaseRequest.onupgradeneeded = (event: any) => {
      const database: IDBDatabase = event.target.result;
      database.createObjectStore("employees", {autoIncrement: true});

    }
  }

  public addEmployee(employee: any): void {
    const transaction: IDBTransaction = this.database.transaction(["employees"], "readwrite");
    
    transaction.oncomplete = (event: any) => {
      this.UpdateEmployees();
    }

    transaction.onerror = (event) => {
      console.log(event);
    }

    const objectStore = transaction.objectStore("employees");
    const result = objectStore.add(employee);
  }

  public removeEmployee(key: number): void {
    const transaction = this.database.transaction(["employees"], "readwrite");
    transaction.oncomplete = (event) => {
      this.UpdateEmployees();
      console.log('employee deleted');
    }
    const objectStore = transaction.objectStore("employees");
    objectStore.delete(key);
  }

  public UpdateEmployees(): void{
    const transaction: IDBTransaction = this.database.transaction(["employees"], "readonly");

    const objectStore = transaction.objectStore("employees");
    const employees: Employee[] = new Array<Employee>();
    const request = objectStore.openCursor();

    request.onsuccess = (event: any) => {
      const cursor = event.target.result;
      if (cursor) {
        const key = cursor.primaryKey;
        const value = cursor.value;
        const employee: Employee = new Employee(value.employeeName, value.role, value.startAt, value.endAt, key);
        employees.push(employee);
        cursor.continue();
      } 
      else {
        this.myEmployeeService.employees.set(employees);
      }
    }
  }

  public getEditEmployee(key: number): void {
    const transaction: IDBTransaction = this.database.transaction("employees", "readonly");

    const objectStore = transaction.objectStore("employees");
    const request: IDBRequest<any> = objectStore.get(key);
    request.onsuccess = (event: any) => {
      if (event.target.result !== null) {
        const value = event.target.result;
        this.myEmployeeService.editEmployee.set(new Employee(value.employeeName, value.role, value.startAt, value.endAt, key));
        this.myEmployeeService.navigateToEditForm();
       
      }
    }
  }

  public saveEditEmployee(employee: Employee): void {
    const transaction: IDBTransaction = this.database.transaction(["employees"], "readwrite");
    
    transaction.oncomplete = (event: any) => {
      this.UpdateEmployees();
    }

    transaction.onerror = (event) => {
      console.log(event);
    }

    const objectStore = transaction.objectStore("employees");
    const result = objectStore.put(employee, employee.key);
  }

}
