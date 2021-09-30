import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators'
import { pipe } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data: any;

  constructor(private http : HttpClient) { }

  postResgistration(data:any){
    return this.http.post<any>("https://cafe-apirest.herokuapp.com/api/users",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getResgistration(){
    return this.http.get<any>("https://cafe-apirest.herokuapp.com/api/users")
    .pipe(map((res:any)=>{
    return res;

    }))
  }

  updateRegistration(data :any,id: number){
    return this.http.put<any>("https://cafe-apirest.herokuapp.com/api/users/"+id ,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteRegistration(id : number){
    return this.http.delete<any>("https://cafe-apirest.herokuapp.com/api/users/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
