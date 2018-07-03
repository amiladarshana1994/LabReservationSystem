import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-viewlab',
  templateUrl: './viewlab.component.html',
  styleUrls: ['./viewlab.component.css']
})
export class ViewlabComponent implements OnInit {
  labs;
  constructor(
    private authservice : AuthService
  ) { }

  ngOnInit() {
    this.authservice.viewLab().subscribe(res=>{
      this.labs=res;
      //console.log(this.labs);
    });
  }

}
