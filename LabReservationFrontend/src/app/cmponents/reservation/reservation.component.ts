import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Route, Router } from '@angular/router';
import { Time } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

    labs;   
    labname : String ;
    date    : String ;
    intime  : String ;
    reason  : String ;

  constructor(
    private authservice : AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router : Router
  ) { }

  ngOnInit() {
    this.authservice.viewLab().subscribe(res=>{
      this.labs=res;
      //console.log(this.labs);
    });
  }

  reservation(regdata){
    
     console.log(regdata);
     if (this.authservice.loggin()){
      //console.log(!this.authservice.loggin());
      this.authservice.makeReservation(regdata).subscribe(res=>{
        //console.log(res);
        if(res.state){
          this.ngFlashMessageService.showFlashMessage({
            messages: [res.msg], 
            dismissible: true, 
            timeout: 3000,
            type: 'success',  
          });
          this.router.navigate(['/home']);
        }
        else{
          this.ngFlashMessageService.showFlashMessage({
            messages: [res.msg], 
            dismissible: true, 
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/reservation']);
        }
      });
    }
    

  }


}