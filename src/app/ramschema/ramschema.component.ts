import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RamschemaService } from '../services/ramschema.service';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-ramschema',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ramschema.component.html',
  styleUrl: './ramschema.component.css'
})
export class RamschemaComponent {
  // properties
  allCourses: Course[] = [];
  savedCodes: string[] = [];
  savedCourses: Course[] = [];
  coursesCount: number = 0;
  totalPoints: number = 0;

  constructor(
    private courseservice : CourseService,
    private ramschemaservice: RamschemaService
  ) {}

  // methods
  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.allCourses = data;
      this.savedCodes = this.ramschemaservice.get();
      this.savedCourses = this.allCourses.filter(course => this.savedCodes.includes(course.courseCode));
      this.coursesCount = this.savedCodes.length;
      this.updatePoints();
    })
  }
  
  removeCourse(code: string): void {
    // delete from localStorage
    this.ramschemaservice.delete(code);

    // update local arrays
    if (this.savedCodes.includes(code)) {
      const codeIndex = this.savedCodes.indexOf(code);
      this.savedCodes.splice(codeIndex, 1);

      const courseIndex = this.savedCourses.findIndex(course => course.courseCode === code);
      this.savedCourses.splice(courseIndex, 1);
    }

    // update properties
    this.coursesCount = this.savedCodes.length;
    this.updatePoints();
  }

  updatePoints(): void {
    let count: number = 0;

    this.savedCourses.forEach((course => {
      count += course.points;
    }));

    this.totalPoints = count;
  }
}
