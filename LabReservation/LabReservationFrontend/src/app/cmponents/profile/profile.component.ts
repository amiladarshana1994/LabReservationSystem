import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : any ;

  constructor(
    private authservice : AuthService,
    private ngFlashMessageService : NgFlashMessageService,
    private router : Router
  ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(res=>{
      //console.log(res);
      this.user = res.user ;
      //console.log(this.user);
      
  });


}
}




