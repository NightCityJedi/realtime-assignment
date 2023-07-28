import { Component, Input, OnInit } from '@angular/core';
import WordDate from '../wordDate';
import { EmployeeFormService } from '../employee-form.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  public wordDates: WordDate[] = new Array<WordDate>();
  private dayWords: Map<string, Function> = new Map<string, Function>();
  @Input() key: string = '';
  private dateStrings: Map<string, string[]> = new Map<string, string[]>();
  public formControl: FormControl = new FormControl('');
  constructor(private myEmployeeFormService: EmployeeFormService){

  }

  ngOnInit(): void {
    this.populateWordDatesConstants();
    this.dateStrings.set('start', this.myEmployeeFormService.startDateStrings);
    this.dateStrings.set('end', this.myEmployeeFormService.endDateStrings);
    this.setWordDates(this.dateStrings.get(this.key));
    this.formControl = this.getFormControl(this.key);
  }
  
  
  private populateWordDatesConstants(): void {
    this.dayWords.set("today", WordDate.today);
    this.dayWords.set("tomorrow", WordDate.tomorrow);
    this.dayWords.set("No Date", WordDate.noDate);
    this.dayWords.set("Next Monday", WordDate.nextMonday);
    this.dayWords.set("Next Tuesday", WordDate.nextTuesday);
  }

  private setWordDates(IncludeWordDates: string[] | undefined): void {
    if (IncludeWordDates !== undefined) {
      IncludeWordDates.forEach((value) => {
        const fn: Function | undefined = this.dayWords.get(value);
        if (fn !== undefined){
          this.wordDates.push(fn());
        }
      })
    }
  }

  private getFormControl(key: string): FormControl {
    if (key === 'start') {
      return this.myEmployeeFormService.form().controls['startAt'] as FormControl;
    }
    if (key === 'end') {
      return this.myEmployeeFormService.form().controls['endAt'] as FormControl;
    }
    return new FormControl('');
  }
  
  handleWordDate($i: number): void {
    const date: Date | null = this.wordDates[$i].date;
    this.formControl.setValue(date);
  }
  
}
