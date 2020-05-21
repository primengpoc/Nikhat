import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService{

persons:User[]=[];
constructor(){}

addPerson(u:User){
 this.persons.push(u);
}

getAllPersons(): any{
    return this.persons;
  }
}