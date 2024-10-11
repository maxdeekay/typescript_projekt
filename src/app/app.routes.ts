import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { RamschemaComponent } from './ramschema/ramschema.component';

export const routes: Routes = [
    {path: "courses", component: CoursesComponent},
    {path: "ramschema", component: RamschemaComponent},
    {path: "", component: RamschemaComponent},
    {path: "**", component: CoursesComponent}
];