import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { RamschemaComponent } from './ramschema/ramschema.component';

export const routes: Routes = [
    {path: "courses", component: CoursesComponent, title: "Nevermore"},
    {path: "ramschema", component: RamschemaComponent, title: "Ramschema"},
    {path: "", component: CoursesComponent},
    {path: "**", component: CoursesComponent}
];