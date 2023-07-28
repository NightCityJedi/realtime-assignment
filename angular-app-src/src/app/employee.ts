export default class Employee {
    key: number;
    employeeName: string;
    role: string;
    startAt: Date;
    endAt: Date;
    constructor(employeeName: string, role: string, startAt: Date, endAt: Date, key: number) {
        this.employeeName = employeeName;
        this.role = role;
        this.startAt = startAt;
        this.endAt = endAt;
        this.key = key;
    }
}