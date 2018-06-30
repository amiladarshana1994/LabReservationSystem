import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule,MatToolbarModule,MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common'; 
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { ProfileComponent } from './cmponents/profile/profile.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './cmponents/navbar/navbar.component';
import { RegformComponent } from './cmponents/regform/regform.component';
import { LoginformComponent } from './cmponents/loginform/loginform.component';
import { BodyComponent } from './cmponents/body/body.component';
import { AuthService } from './service/auth.service';
import { SidebarComponent } from './cmponents/sidebar/sidebar.component';




const applicationRouts : Routes = [
  //localhost:4200/login
  {path : 'login', component : LoginformComponent},
  {path : 'register', component : RegformComponent},
  {path : 'profile', component : ProfileComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegformComponent,
    LoginformComponent,
    BodyComponent,
    
    SidebarComponent,
    
    ProfileComponent,
   
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRouts),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    MatButtonModule,MatCardModule,MatToolbarModule,MatInputModule,
    CommonModule,
    BrowserAnimationsModule,
    NgFlashMessagesModule.forRoot()
    
    
  ],
  providers: [AuthService,],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
