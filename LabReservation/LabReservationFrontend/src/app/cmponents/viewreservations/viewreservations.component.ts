import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-viewreservations',
  templateUrl: './viewreservations.component.html',
  styleUrls: ['./viewreservations.component.css'],
  
})
export class ViewreservationsComponent implements OnInit {

  reservations ;
    constructor(
    private authservice : AuthService
  ) { }

  ngOnInit() {
    this.authservice.getReservation().subscribe(res=>{
      this.reservations=res;
      console.log(this.reservations);
    });
  }

}

 
