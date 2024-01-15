import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AssetModel} from '../../models/asset.model';
import {AssetService} from './service/asset.service';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'cons-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit{
  asset: AssetModel[] = [];
  currentAsset!: AssetModel;
  message ='';
  isVisible = false;
  isOkLoading = false;
  id : number | undefined;
  constructor(private assetService: AssetService, private router: Router,private messageNoti: NzMessageService) { }

  private getAsset(): void {
    this.assetService.getAssetList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.asset= res.content;
      }
    })
  }
  searchInput :string = '';
  getAssetListSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.assetService.getAssetListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.asset= res.content;
      }
    })
  }

  updateStatus(id: any, status: number): void {
    this.assetService.get(id).subscribe((data: AssetModel) => {
      this.currentAsset = data;
      console.log(this.currentAsset);
    });
    this.assetService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentAsset.trangThai = status
          this.getAsset();
        },
      });
  }

  updateAsset(): void {
    this.assetService
      .update(this.currentAsset.id, this.currentAsset)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getAsset();
        },
        error: (e) => console.error(e)
      });
  }
  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.assetService.get(this.id).subscribe((data: AssetModel) => {
      this.currentAsset = data;
      console.log(this.currentAsset);
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.updateAsset();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  ngOnInit() {
    this.getAsset();
  }

}
