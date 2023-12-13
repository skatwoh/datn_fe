import {Component, OnInit} from '@angular/core';
import {CaseService} from "./case.service";
import {RoomMappingCtpModel} from "../../../models/room-mapping-ctp.model";

@Component({
  selector: 'cons-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit{

  rooms: RoomMappingCtpModel[] = [];

  constructor(private caseService: CaseService) {}

  ngOnInit(): void {
    this.getRoomOfFloar();
  }

  getRoomOfFloar(): void {
    this.caseService.getRoomOfFloar(1, 50).subscribe(res => {
      if (res && res.content) {
        this.rooms = res.content;
      }
    })
  }
}
