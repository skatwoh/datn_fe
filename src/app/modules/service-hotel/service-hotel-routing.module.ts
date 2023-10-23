import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { ServiceHotelComponent } from './hotel-service.component';


const routes: Routes = [
  {
    path: '',
    component: ServiceHotelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceHotelRoutingModule { }
