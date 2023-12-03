import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetModel } from '../../models/asset.model';
import { AssetService } from './service/asset.service';

@Component({
  selector: 'cons-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit{
  asset: AssetModel[] = [];
  constructor(private assetService: AssetService, private router: Router) { }

  private getAsset(): void {
    this.assetService.getAssetList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.asset= res.content;
      }
    })
  }
  ngOnInit() {
    this.getAsset();
  }

}
