import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { AssetComponent } from './asset.component';


const routes: Routes = [
  {
    path: '',
    component: AssetComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
