import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ProjectModel} from "../../../models/project.model";
import {ProjectService} from "../service/project.service";

@Component({
  selector: 'cons-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit{
  id: number | undefined;
  projectModel!: ProjectModel;
  message ='';
  constructor(public projectService: ProjectService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient) {}



  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.projectService.get(this.id).subscribe((data: ProjectModel) => {
      this.projectModel = data;
      console.log(this.projectModel);
    });
  }

  updateProject(): void {

    this.projectService
      .update(this.projectModel.id, this.projectModel)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Update thành công!'
        },
        error: (e) => console.error(e)
      });
    this.router.navigate(['/admin/project']);
  }

}
