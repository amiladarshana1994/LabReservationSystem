import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-addlab',
  templateUrl: './addlab.component.html',
  styleUrls: ['./addlab.component.css']
})
export class AddlabComponent implements OnInit {

  constructor(
    private authservice : AuthService ,
    private ngFlashMessageService: NgFlashMessageService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  addlab(lab){
    if (this.authservice.loggin()){
      this.authservice.registerLab(lab).subscribe(res=>{
     // console.log(res);
     if(res.state){
      this.ngFlashMessageService.showFlashMessage({
        messages: [res.msg], 
        dismissible: true, 
        timeout: 3000,
        type: 'success',  
      });
      this.router.navigate(['/viewlab']);
    }
    else{
      this.ngFlashMessageService.showFlashMessage({
        messages: [res.msg], 
        dismissible: true, 
        timeout: 3000,
        type: 'danger'
      });
      this.router.navigate(['/addlab']);
    }
     });
    }
  }
}

  
