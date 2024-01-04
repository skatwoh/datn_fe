import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AssetComponent} from './asset.component';
import {AssetCreateComponent} from "./asset-create/asset-create.component";
import {AssetDetailComponent} from "./asset-detail/asset-detail.component";


const routes: Routes = [
  {
    path: '',
    component: AssetComponent,
  },
  { path: 'asset-create', component: AssetCreateComponent },
  { path: 'asset-details/:id', component: AssetDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
