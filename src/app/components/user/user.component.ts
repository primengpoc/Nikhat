import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from './../../product.service';
import { Car } from './../../car.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  pageTitle: string = 'User Page';
  public cars: Car[];
  public datasource: Car[];
  public totalRecords: number;
  public loading: boolean;
  public selectedColumns: any[];
  public cols: any[];
  public colors: any[];
  public brands: any[];
  public columnOptions: any[];
  public errorMessage: string = '';
  
  constructor(public productService:ProductService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' },
      { field: 'price', header: 'Price'}
    ];

    this.loading = true;
    
   this.productService.getCars().subscribe({
      next: cars => {
        this.cars = cars;
      },
      error: err => this.errorMessage = err
   });
  
  
   if (!localStorage.getItem('selectedColumns')) {
      this.setColumnsDefaultValue();
    } else {
      this.selectedColumns = JSON.parse(localStorage.getItem('selectedColumns'));
    }
  }

  public getColumnsField() {
    return this.selectedColumns.map(c => c.field).join(',')
  }

  public setColumnsDefaultValue() {
    this.selectedColumns = this.cols;
    this.save();

  }

  public save() {
    localStorage.setItem('selectedColumns', JSON.stringify(this.selectedColumns));
  }
  
  exportToExcel(): void {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.cars);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "productsData");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

}
