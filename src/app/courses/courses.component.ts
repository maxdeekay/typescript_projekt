import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { RamschemaService } from '../services/ramschema.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  // properties
  courselist: Course[] = [];
  filteredCourselist: Course[] = [];
  subjects: string[] = [];
  savedCodes: string[] = [];
  currentCount: number = 0;
  totalCount: number = 0;
  input: string = "";
  selectedSubject: string = "Alla";

  constructor(
    private courseservice : CourseService,
    private ramschemaservice: RamschemaService
  ) {}

  // methods
  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courselist = data;
      this.filteredCourselist = this.courselist;
      this.totalCount = this.courselist.length;
      this.currentCount = this.totalCount;

      // get every unique subject
      for (let course of this.courselist) {
        if (!this.subjects.includes(course.subject)) {
          this.subjects.push(course.subject);
        }
      }

      this.savedCodes = this.ramschemaservice.get();
    })
  }

  sort(option: string): void {
    switch (option) {
      case "code": {
        this.filteredCourselist.sort((a, b) => a.courseCode.localeCompare(b.courseCode, "sv"));
        break;
      }
      case "name": {
        this.filteredCourselist.sort((a, b) => a.courseName.localeCompare(b.courseName, "sv"));
        break;
      }
      case "points": {
        this.filteredCourselist.sort((a, b) => b.points - a.points);
        break;
      }
      case "subject": {
        this.filteredCourselist.sort((a, b) => a.subject.localeCompare(b.subject, "sv"));
        break;
      }
      default: {
        console.log("Invalid option.");
        break;
      }
    }
  }

  search(): void {
    this.subjectFilter();
    this.filteredCourselist = this.filteredCourselist.filter(course => course.courseCode.toLowerCase().includes(this.input.toLowerCase()));
    this.currentCount = this.filteredCourselist.length;
  }

  subjectFilter(): void {
    this.filteredCourselist = this.courselist;
    if (this.selectedSubject === "Alla") {
      this.currentCount = this.filteredCourselist.length;
      return;
    }

    this.filteredCourselist = this.filteredCourselist.filter(course => course.subject === this.selectedSubject);
    this.currentCount = this.filteredCourselist.length;
  }

  addCourse(code: string): void {
    // add course code to localStorage
    this.ramschemaservice.add(code);

    // add pressed course code to local list
    if (!this.savedCodes.includes(code)) this.savedCodes.push(code);
  }
}