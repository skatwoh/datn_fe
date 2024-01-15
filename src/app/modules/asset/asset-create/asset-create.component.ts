import {Component, OnInit} from '@angular/core';
import {AssetModel} from "../../../models/asset.model";
import {AssetService} from "../service/asset.service";

@Component({
  selector: 'cons-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.scss']
})
export class AssetCreateComponent implements OnInit{
  asset : AssetModel ={
    id: 0,
    ma: '',
    ten: '',
    ghiChu: '',
    trangThai: 0
  };
  submitted = false;
  constructor(private assetService: AssetService) {}

  ngOnInit() {
    console.log(this.asset);
  }


  saveAsset(): void {
    const data = {
      ma: this.asset.ma,
      ten: this.asset.ten,
      ghiChu: this.asset.ghiChu,
      trangThai: 1
    };

    this.assetService.create(data).subscribe({
      next: (res) => {
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newAsset(): void {
    this.submitted = false;
    this.asset = {
      id: 0,
      ma: '',
      ten: '',
      ghiChu: '',
      trangThai: 0
    };
  }

  protected readonly AssetModel = AssetModel;
}
