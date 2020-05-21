import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private router:Router,private aservice:UserService) { }

  userNew: User;
  users: User[];
  @ViewChild('addForm') formValues;

  ngOnInit(): void {
    this.userNew = {
      Id: "",
      FirstName: "",
      LastName: "",
      Email: "",
      MobileNumber: ""
    };

    this.users = [
      {
        Id: "1",
        FirstName: "Ganesh",
        LastName: "Kumar",
        Email: "ganeshKumar@gmail.com", 
        MobileNumber: "9874567321"
      }
    ];
  }

  addUser(u:User) {
    u.Id=this.userNew.Id;
    u.FirstName=this.userNew.FirstName;
    u.LastName=this.userNew.LastName;
    u.Email=this.userNew.Email;
    u.MobileNumber=this.userNew.MobileNumber;
    this.aservice.addPerson(u);
   // return this.users;

   this.router.navigate(['user-info']);
  }

}
