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
    
    if(userdata.email===""){
        //console.log(userdata);
        this.ngFlashMessageService.showFlashMessage({
          messages: ["please enter your email address"], 
          dismissible: true, 
          timeout: 3000,
          type: 'success',  
        });
    }
    else{
      this.authservice.loginuser(userdata).subscribe(res=>{
        //console.log(res.user);
        
        //console.log(res.state);
        if (res.state){

            //console.log(res.user.email);
            if(user.email !='admin@gmail.com'){
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
              this.router.navigate(['/home']);
              this.authservice.storeData(res.token,res.user);
              this.authservice.adminLogout();
              this.router.navigate(['/home']);
            }
            else{
              this.ngFlashMessageService.showFlashMessage({
                messages: ["Login Success..Login as Admin."], 
                dismissible: true, 
                timeout: 3000,
                type: 'success',  
              });
              this.router.navigate(['/adminhome']);
              this.authservice.storeData(res.token,res.user);
              this.authservice.adminLog();
            }             
        }else {
          //console.log('qq');
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

}
