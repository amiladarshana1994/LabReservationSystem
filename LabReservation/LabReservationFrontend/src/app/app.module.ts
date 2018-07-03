import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule,MatToolbarModule,MatInputModule,MatIconModule,MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common'; 
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconRegistry, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material'

import { ProfileComponent } from './cmponents/profile/profile.component';
import { AppComponent } from './app.component';
import { RegformComponent } from './cmponents/regform/regform.component';
import { LoginformComponent } from './cmponents/loginform/loginform.component';
import { AuthService } from './service/auth.service';
import { ReservationComponent } from './cmponents/reservation/reservation.component';
import { ViewreservationsComponent } from './cmponents/viewreservations/viewreservations.component';
import { AddlabComponent } from './cmponents/addlab/addlab.component';
import { MainnavComponent } from './cmponents/mainnav/mainnav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './cmponents/home/home.component';
import { AdminhomeComponent } from './cmponents/adminhome/adminhome.component';
import { AdminNavComponent } from './cmponents/admin-nav/admin-nav.component';
import { ViewlabComponent } from './cmponents/viewlab/viewlab.component';







const applicationRouts : Routes = [
  //localhost:4200/login
  {path : 'login', component : LoginformComponent},
  {path : 'register', component : RegformComponent},
  {path : 'user', component : HomeComponent},
  {path : 'profile', component : ProfileComponent},
  {path : 'reservation', component : ReservationComponent},
  {path : 'viewreservation', component : ViewreservationsComponent},
  {path : 'registerlab', component : AddlabComponent},
  {path : 'home', component : HomeComponent},
  {path : 'adminhome', component : AdminNavComponent},
  {path : 'addlab', component : AddlabComponent},
  {path : 'viewlab', component : ViewlabComponent},
   
]

@NgModule({
  declarations: [
    AppComponent,
    RegformComponent,
    LoginformComponent,
    ProfileComponent,
    ReservationComponent,
    ViewreservationsComponent,
    AddlabComponent,
    MainnavComponent,
    HomeComponent,
    AdminhomeComponent,
    AdminNavComponent,
    ViewlabComponent,
    
    
    
   
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRouts),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    MatButtonModule,MatCardModule,MatToolbarModule,MatInputModule,MatIconModule,MatListModule,
    CommonModule,
    BrowserAnimationsModule,
    NgFlashMessagesModule.forRoot(),
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    
    
    
  ],
  providers: [AuthService,],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
