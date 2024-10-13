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
  courselist: Course[] = []; // full list of all courses
  filteredCourselist: Course[] = []; // currently showing list
  subjects: string[] = []; // all available subjects
  savedCodes: string[] = []; // codes of all saved courses
  currentCount: number = 0; // amount of currently showing courses
  totalCount: number = 0; // total amount of courses
  input: string = ""; // current value of search input
  selectedSubject: string = "Alla"; // currently selected subject with "alla" as default
  ascending: boolean = false; // tracking if the sorting is ascending or descending

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

  // sorting function
  sort(option: string): void {
    switch (option) {
      case "code": {
        this.filteredCourselist.sort((a, b) => 
          this.ascending ?
            a.courseCode.localeCompare(b.courseCode, "sv") :
            b.courseCode.localeCompare(a.courseCode, "sv")
        );
        break;
      }
      case "name": {
        this.filteredCourselist.sort((a, b) => 
          this.ascending ?
            a.courseName.localeCompare(b.courseName, "sv") :
            b.courseName.localeCompare(a.courseName, "sv")
          );
        break;
      }
      case "points": {
        this.filteredCourselist.sort((a, b) => 
          this.ascending ?
            b.points - a.points :
            a.points - b.points
          );
        break;
      }
      case "subject": {
        this.filteredCourselist.sort((a, b) => 
          this.ascending ?
            a.subject.localeCompare(b.subject, "sv") :
            b.subject.localeCompare(a.subject, "sv")
          );
        break;
      }
      default: {
        console.log("Invalid sorting option.");
        break;
      }
    }

    this.ascending = !this.ascending; // toggles between ascending/descending with every sort
  }

  // search function
  search(): void {
    this.subjectFilter();
    const codeList = this.filteredCourselist.filter(course => course.courseCode.toLowerCase().includes(this.input.toLowerCase()));
    const courseList = this.filteredCourselist.filter(course => course.courseName.toLowerCase().includes(this.input.toLowerCase()));

    this.filteredCourselist = codeList.concat(courseList);
    this.currentCount = this.filteredCourselist.length;
  }

  // filter by subject
  subjectFilter(): void {
    this.filteredCourselist = this.courselist;
    if (this.selectedSubject === "Alla") {
      this.currentCount = this.filteredCourselist.length;
      return;
    }

    this.filteredCourselist = this.filteredCourselist.filter(course => course.subject === this.selectedSubject);
    this.currentCount = this.filteredCourselist.length;
  }

  // when "LÄGG TILL" is clicked
  addCourse(code: string): void {
    // add course code to localStorage
    this.ramschemaservice.add(code);

    // add pressed course code to local list
    if (!this.savedCodes.includes(code)) this.savedCodes.push(code);
  }
}