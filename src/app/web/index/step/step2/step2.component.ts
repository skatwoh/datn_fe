import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'cons-step',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {
  constructor(private router: Router) {
  }

  handleSave() {
    this.router.navigate(['/me/step/3']);
  }
}
