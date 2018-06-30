import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  email : String ;
  password : String ;

  constructor(
    private authservice : AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  logUser(user){
    const userdata = {
      email : user.email,
      password : user.password
    };
    this.authservice.loginuser(userdata).subscribe(res=>{
        //console.log(res);
        this.authservice.storeData(res.token,res.user);

        if (res.state){
          this.ngFlashMessageService.showFlashMessage({
            // Array of messages each will be displayed in new line
            messages: ["Login Success..."], 
            // Whether the flash can be dismissed by the user defaults to false
            dismissible: true, 
            // Time after which the flash disappears defaults to 2000ms
            timeout: 3000,
            // Type of flash message, it defaults to info and success, warning, danger types can also be used
            type: 'success',  
          });
          
        }else {
          this.ngFlashMessageService.showFlashMessage({
            messages: [res.msg], 
            dismissible: true, 
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/login']);
        }
        
      });
    
  }

}
