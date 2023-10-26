import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel } from '../../models/project.model';
import { ProjectService } from './service/project.service';

@Component({
  selector: 'cons-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
  project: ProjectModel[] = [];
  constructor(private projectService: ProjectService, private router: Router) { }

  private getProjects(): void {
    this.projectService.getProjectList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.project= res.content;
      }
    })
  }
  ngOnInit() {
    this.getProjects();
  }

}
