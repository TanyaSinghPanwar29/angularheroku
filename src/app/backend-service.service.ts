import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private httpClient: HttpClient) { }
  baseUrl: string = "https://zopperbackend.herokuapp.com";
  submitDetails: string = "/submit-details";
  
  submit(data){
    let fullUrl = this.baseUrl + this.submitDetails;;
    return this.httpClient.post(fullUrl,data);
  }
}
