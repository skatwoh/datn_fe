import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AssetModel} from "../../../models/asset.model";
import {AssetService} from "../service/asset.service";

@Component({
  selector: 'cons-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit{
  id: number | undefined;
  assetModel!: AssetModel;
  message ='';
  constructor(public assetService: AssetService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient) {}



  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.assetService.get(this.id).subscribe((data: AssetModel) => {
      this.assetModel = data;
      console.log(this.assetModel);
    });
  }

  updateAsset(): void {
    this.assetService
      .update(this.assetModel.id, this.assetModel)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Update thành công!'
        },
        error: (e) => console.error(e)
      });
    this.router.navigate(['/admin/asset']);
  }

}
