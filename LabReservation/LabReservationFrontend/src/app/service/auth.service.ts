import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { HttpClient,HttpHeaders, } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : any ;
  authtoken : any ;

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

  

  fetchToken(){
    const token = localStorage.getItem("tokenid");
    this.authtoken = token ;
  }

  storeData(token,user){
    localStorage.setItem("tokenid",token);
    localStorage.setItem("user",JSON.stringify(user));

    this.authtoken = token ;
    this.authtoken = user ;

  }

  logout(){
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
  }

}

 