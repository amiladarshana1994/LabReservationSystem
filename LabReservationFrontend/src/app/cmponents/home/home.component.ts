import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reservations ;
  constructor(
    private authservice : AuthService
  ) { }

  ngOnInit() {
    this.authservice.getUserReservation().subscribe(res=>{
      this.reservations=res;
      //console.log(this.reservations);
    });
  }

}
