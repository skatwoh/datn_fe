import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProjectComponent} from './project.component';
import {ProjectCreateComponent} from "./project-create/project-create.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
  },
  { path: 'project-create', component: ProjectCreateComponent },
  { path: 'project-details/:id', component: ProjectDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
