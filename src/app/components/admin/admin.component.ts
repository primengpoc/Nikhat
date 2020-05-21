import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../product.service';
import { Car } from './../../car.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  pageTitle = 'Admin Page';
  public cars: Car[];
  public datasource: Car[];
  public totalRecords: number;
  public loading: boolean;
  public selectedColumns: any[];
  public cols: any[];
  public colors: any[];
  public brands: any[];
  public columnOptions: any[];
  public errorMessage = '';


  clonedCars: { [s: string]: Car } = {};

  constructor(public productService: ProductService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' },
      { field: 'price', header: 'Price'}
    ];
    this.brands = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'}
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
    return this.selectedColumns.map(c => c.field).join(',');
  }

  public setColumnsDefaultValue() {
    this.selectedColumns = this.cols;
    this.save();

  }

  public save() {
    localStorage.setItem('selectedColumns', JSON.stringify(this.selectedColumns));
  }
  exportToExcel(): void {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.cars);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'productsData');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

onRowEditInit(car: Car) {
  this.clonedCars[car.vin] = { ...car };
}

onRowEditSave(car: Car) {
  delete this.clonedCars[car.vin];
}

onRowEditCancel(car: Car, index: number) {
  console.log(JSON.stringify(car));
  this.cars[index] = this.clonedCars[car.vin];
  delete this.clonedCars[car.vin];
}
newRow() {
  return { brand: '', year: '', color: '', vin: '', price: '' };
}
}
