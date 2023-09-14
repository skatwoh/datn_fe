import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {ImportExcelService} from '../../services/import-excel.service';
import {AppConstants} from '../../../app-constants';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'cons-choice-excel',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzSpinModule, ReactiveFormsModule],
  templateUrl: './choice-excel.component.html',
  styleUrls: ['./choice-excel.component.scss']
})
export class ChoiceExcelComponent implements OnInit, OnDestroy {

  // @ts-ignore
  public readFileCallback: Function;

  selectedFileName = null;
  tempData: any[] = [];
  isUploading = false;
  settingForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    private importExcelService: ImportExcelService,
    private fb: FormBuilder,
    @Inject(NZ_MODAL_DATA) public data: any
  ) {
    this.settingForm = this.fb.group({
      startTitleRow: [2, Validators.compose([Validators.required])],
      startDataRow: [4, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.readFileCallback = this.setData.bind(this);
  }

  onChooseFile(event: any) {
    this.isUploading = true;
    const file = event.target.files[0];
    this.selectedFileName = event.target.files[0]?.name;

    if (file) {
      const currentFileSize = (file.size / 1024) / 1024;
      const isValidFileSize = currentFileSize > 0 && currentFileSize <= AppConstants.EXCEL_MAX_FILE_SIZE;

      if (!isValidFileSize) {
        return;
      }

      this.selectedFileName = event.target.files[0]?.name;
      const target: DataTransfer = (event.target) as DataTransfer;
      this.importExcelService.readFile(target, this.readFileCallback);
    }

    setTimeout(() => {
      setTimeout(() => event.target.value = null);
    });
  }

  private async setData(data: any) {
    this.isUploading = true;
    const settingFormValue = this.settingForm.value;
    if (settingFormValue.startDataRow) {
      const excelData = data.slice(Number(settingFormValue.startDataRow), Number(data.length));
      this.array2Object(excelData, this.data.fields);
    } else {
      this.isUploading = false;
    }
  }

  private array2Object(rawData: any[] = [], fields: string[] = []): void {
    this.tempData = [];
    let i = 0;
    for (i = 0; i < rawData.length; i++) {
      const newObj: any = {};
      fields.forEach((f, fIndex) => {
        newObj[f] = rawData[i][fIndex];
      });

      this.tempData.push(newObj)
    }
    this.isUploading = false;
  }

  ngOnDestroy() {

  }
}
