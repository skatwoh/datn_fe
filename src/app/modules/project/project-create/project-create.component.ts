import {Component, OnInit} from '@angular/core';
import {ProjectModel} from "../../../models/project.model";
import {ProjectService} from "../service/project.service";

@Component({
  selector: 'cons-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit{
  project : ProjectModel ={
  id: 0,
  ma: '',
  ten: '',
  tienDo: 0,
  chiPhi: 0,
  ngayBatDau: '',
  ngayKetThuc: '',
  ghiChu: '',
  trangThai: 0
};
  submitted = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    console.log(this.project);
  }


  saveProject(): void {
    const data = {
      ma: this.project.ma,
      ten: this.project.ten,
      tienDo: this.project.tienDo,
      chiPhi: this.project.chiPhi,
      ngayBatDau: this.project.ngayBatDau,
      ngayKetThuc: this.project.ngayKetThuc,
      ghiChu: this.project.ghiChu,
      trangThai: 1
    };

    this.projectService.create(data).subscribe({
      next: (res) => {
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newProject(): void {
    this.submitted = false;
    this.project = {
      id: 0,
      ma: '',
      ten: '',
      tienDo: 0,
      chiPhi: 0,
      ngayBatDau: '',
      ngayKetThuc: '',
      ghiChu: '',
      trangThai: 0
    };
  }

  protected readonly ProjectModel = ProjectModel;

}
