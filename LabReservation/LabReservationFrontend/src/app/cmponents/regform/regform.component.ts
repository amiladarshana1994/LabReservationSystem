import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Route, Router } from '@angular/router';

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
    private ngFlashMessageService: NgFlashMessageService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  registerdata(user){
    //console.log('worked');
      /* const userdetails = {
      name     : user.name,
      username : this.username,
      email    : this.username,
      password : this.password

    }   */
    //console.log(userdetails);
    this.authService.registerUser(user).subscribe(res=>{
      //console.log(res);
      if (res.state){
        this.ngFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["You are Registered..Please Login..."], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 3000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success',  
        });
        this.router.navigate(['/login']);
      }else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Something went wrong..!Please try again..."], 
          dismissible: true, 
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(['/register']);
      }
      
    });
  };
  } 
  