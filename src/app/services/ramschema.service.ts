import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RamschemaService {

  constructor() { }

  get(): string[] {
    const temp: string = localStorage.getItem("courses") || "";
    let courselist: string[] = [];
    if (temp.length > 0) courselist = JSON.parse(temp);
    return courselist;
  }

  save(courses: string[]): void {
    const newList: string = JSON.stringify(courses);
    localStorage.setItem("courses", newList);
  }

  add(code: string): void {
    let courselist: string[] = this.get();

    if (!courselist.includes(code)) courselist.push(code);

    this.save(courselist);
  }

  delete(code: string): void {
    let courselist: string[] = this.get();

    if (courselist.includes(code)) {
      const index = courselist.indexOf(code);
      courselist.splice(index, 1);
    }

    this.save(courselist);
  }
}