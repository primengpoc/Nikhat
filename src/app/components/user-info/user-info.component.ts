import { Component, OnInit } from '@angular/core';
import {TableModule} from 'primeng/table';
import { UserService } from '../../user.service';
import { User } from '../../user.model';
import { Key } from 'protractor';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  users: User[];
  addedusers:User[];
  cols: any[];

  constructor(private uservice:UserService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'Id', header: 'Id'},
      { field: 'FirstName', header: 'First Name'}, 
      { field: 'LastName', header: 'Last Name'}, 
      { field: 'Email', header: 'E-mail'}, 
      { field: 'MobileNumber', header: 'Mobile No.'}
    ]

    this.users = [
      {Id:"7",Email:"michael.lawson@reqres.in",FirstName:"Michael",LastName:"Lawson",MobileNumber: "987654321"},
  {Id:"8",Email:"lindsay.ferguson@reqres.in",FirstName:"Lindsay",LastName:"Ferguson",MobileNumber: "987654321"},
  {Id:"9",Email:"tobias.funke@reqres.in",FirstName:"Tobias",LastName:"Funke",MobileNumber: "987654321"},
  {Id:"10",Email:"byron.fields@reqres.in",FirstName:"Byron",LastName:"Fields",MobileNumber: "987654321"},
  {Id:"11",Email:"george.edwards@reqres.in",FirstName:"George",LastName:"Edwards",MobileNumber: "987654321"},
  {Id:"12",Email:"rachel.howell@reqres.in",FirstName:"Rachel",LastName:"Howell",MobileNumber: "987654321"}
    ];

    this.addedusers=this.uservice.getAllPersons();
    console.log(this.addedusers);
    this.addedusers.forEach(element => {
      this.users.push(element);
    });

  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.users);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        xlsx.writeFile(workbook, 'UserProfile.xlsx');
    });
  }

  getUsers() {

  }

}
