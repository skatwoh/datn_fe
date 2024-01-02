import {Component, OnInit} from '@angular/core';
import {ProjectModel} from "../../../models/project.model";
import {ProjectService} from "../service/project.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  // @ts-ignore
  submitForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder) {
    this.submitForm = this.fb.group({
      chiPhi: new FormControl(null, Validators.compose([ Validators.nullValidator, Validators.min(1000), Validators.max(100000000000)])),
      tienDo: new FormControl(null, Validators.compose([ Validators.nullValidator, Validators.min(1000), Validators.max(100000000000)])),
      ten: ['',Validators.required],
      ngayBatDau: ['',Validators.required],
      ngayKetThuc: ['', Validators.required],
      ghiChu: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.project);
  }
  saveProject(): void {
    if (this.submitForm.valid) {
      const data = this.submitForm.value;

      this.projectService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
    }
  }
  newProjectService(): void {
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
