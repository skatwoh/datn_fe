import {Injectable, OnDestroy} from '@angular/core';
import * as XLSX from 'xlsx';

type TABLE = any[][];

export interface Header {
  name: string;
  width: number;
}

export interface ExportConfig {
  title?: string;
  logo?: string;
  headers?: Header[];
  sheetTitle?: string;
  defaultRowHeight?: number | 22;
  hasProtected?: boolean;
  templateCode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImportExcelService implements OnDestroy{
  readonly FONT_STYLE = 'Times New Roman';
  data: TABLE = [];
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  constructor() { }

  readFile(target: any, callBackFn: any,) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      // read and convert excel data to binary type
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'buffer'});

      let convertedData: any;
      // Read first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      convertedData = (XLSX.utils.sheet_to_json(ws, {header: 1, defval: null})) as TABLE;

      callBackFn(convertedData);
    };
    reader.readAsArrayBuffer(target.files[0]);
  }
  ngOnDestroy(): void {
  }
}
