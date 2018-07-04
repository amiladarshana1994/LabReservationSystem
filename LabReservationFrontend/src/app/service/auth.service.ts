import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { HttpClient,HttpHeaders, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt'
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : any ;
  authtoken : any ;
  admin : any ;
  
  constructor(
    private http : Http ,
    

  ) { }

  registerUser(user){
    //console.log(user);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    
    return this.http.post("http://localhost:3000/user/register",user,{headers : headers})
    .pipe(map(res=>res.json()));

  }

  loginuser(userdata){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    
    return this.http.post("http://localhost:3000/user/login",userdata,{headers : headers})
    .pipe(map(res=>res.json()));
    
  }

  getProfile(){
    this.fetchToken();
    
    let headers = new Headers();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    
    return this.http.get("http://localhost:3000/user/profile",{headers : headers})
           .pipe(map(res=>res.json())); 
  }

  makeReservation(regdata){
    this.fetchToken();
    let headers = new Headers();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    
    return this.http.post("http://localhost:3000/user/reservation",regdata,{headers : headers})
    .pipe(map(res=>res.json()));

  }

  registerLab(lab){
    this.fetchToken();
    let headers = new Headers();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    
    return this.http.post("http://localhost:3000/user/registerlab",lab,{headers : headers})
    .pipe(map(res=>res.json()));
  }

  viewLab(){
    //console.log('aa');
    this.fetchToken();
    let headers = new Headers();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    
    return this.http.get("http://localhost:3000/user/viewlab",{headers : headers})
    .pipe(map(res=>res.json()));
  }

  getReservation(){
    this.fetchToken();
    let headers = new Headers();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    
    return this.http.get("http://localhost:3000/user/viewreservation",{headers : headers})
    .pipe(map(res=>res.json()));
  }

  getUserReservation(){
    this.fetchToken();
    let headers = new Headers();
    headers.append('Authorization',this.authtoken);
    headers.append('Content-Type','application/json');
    
    return this.http.get("http://localhost:3000/user/home",{headers : headers})
    .pipe(map(res=>res.json()));
  }


  fetchToken(){
    const token = localStorage.getItem("tokenid");
    this.authtoken = token ;
  }

  storeData(token,user){
    localStorage.setItem("tokenid",token);
    localStorage.setItem("user",JSON.stringify(user));

    this.authtoken = token ;
    this.user = user ;
    //console.log(this.user);

  }

  logout(){
    this.authtoken = null;
    this.user = null;
    this.admin = false ;
    localStorage.clear();
  }

  loggin(){
    //console.log("loggin called");
    this.fetchToken();
    if(this.authtoken){
      return true;
    }
    else{
      return false;
    }
  }

  adminLog(){
    this.admin = true ;
    //console.log('adminlog'+this.admin)
  }

  adminLogout(){
    this.admin = false ;
    //console.log('adminlogout'+this.admin)
  }

  isAdmin(){
    return this.admin ;
  } 

  loggedIn(){
    //console.log(tokenNotExpired());
    return tokenNotExpired();

  }

}

 