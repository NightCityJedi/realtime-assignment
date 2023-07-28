import { FormControl } from "@angular/forms";
export default class FormDate {
    public date: Date | undefined;
    public formControlValue: FormControl | undefined;

    constructor(date: Date | undefined, formControlValue: FormControl | undefined){
        this.date = date;
        this.formControlValue = formControlValue;
    }
}