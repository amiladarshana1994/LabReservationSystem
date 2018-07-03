import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
 
@Component({
  selector: 'mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent {
  
  user :any;
  status : any ;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authservice : AuthService,
    private ngFlashMessageService :NgFlashMessageService,
    private router : Router
  ) {}

  ngOnInit() {
    this.authservice.getProfile().subscribe(res=>{
      //console.log(res);
      this.user = res.user;
      //console.log(this.user);
    });
  }

  logoutUser(){
    this.authservice.logout();
    
      this.ngFlashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["You are logged out..."], 
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true, 
        // Time after which the flash disappears defaults to 2000ms
        timeout: 3000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'success',        
    });
    this.router.navigate(['/login']);
    return false; 

  }

  login(){
    return this.authservice.loggin();
  }

  
  }
  