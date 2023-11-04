import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModel } from '../../models/project.model';
import { ProjectService } from './service/project.service';
import {NzMessageModule, NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'cons-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
  project: ProjectModel[] = [];
  currentProject!: ProjectModel;
  message ='';
  isVisible = false;
  isOkLoading = false;
  id : number | undefined;
  constructor(private projectService: ProjectService, private router: Router,private messageNoti: NzMessageService) { }

  private getProjects(): void {
    this.projectService.getProjectList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.project= res.content;
      }
    })
  }
  searchInput :string = '';
  getProjectListSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.projectService.getProjectListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.project= res.content;
      }
    })
  }

  updateStatus(id: any, status: number): void {
    this.projectService.get(id).subscribe((data: ProjectModel) => {
      this.currentProject = data;
      console.log(this.currentProject);
    });
    this.projectService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentProject.trangThai = status
          this.getProjects();
        },
      });
  }

  updateProject(): void {
    this.projectService
      .update(this.currentProject.id, this.currentProject)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getProjects();
        },
        error: (e) => console.error(e)
      });
  }
  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.projectService.get(this.id).subscribe((data: ProjectModel) => {
      this.currentProject = data;
      console.log(this.currentProject);
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.updateProject();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  ngOnInit() {
    this.getProjects();
  }

}
