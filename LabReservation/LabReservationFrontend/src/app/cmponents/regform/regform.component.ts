import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
//import {FlashMessage} from 'angular-flash-message';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.css']
})
export class RegformComponent implements OnInit {
  name : String ;
  username : String ;
  email : String;
  password : String ;

  constructor(
    private authService : AuthService ,
    //private flashMessage : FlashMessage 
  ) { }

  ngOnInit() {
  }

  registerdata(user){
    //console.log('worked');
      const userdetails = {
      name     : user.name,
      username : this.username,
      email    : this.username,
      password : this.password

    }  
    //console.log(userdetails);
    this.authService.registerUser(user).subscribe(res=>{
      console.log(res);
      
    });
  };
  } 
  /* if(res.state){
    this.flashMessage.success('You are Registered...', {
      dalay: 1000,
      generalClass: 'success-class',
      navigate: '/login'
      });
  }
  else{
    this.flashMessage.success('Something went wrong.!Please try again..!', {
      dalay: 1000,
      generalClass: 'danger-class',
      navigate: '/register'
      });   
    } */