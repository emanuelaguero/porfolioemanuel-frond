import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtClientServiceService {
  constructor(private httpClient: HttpClient) { }

  URL = "http://localhost:8080";
  public generateToken(request) {
    return this.httpClient.post<string>(URL+"/authenticate", request, {  responseType: 'text' as 'json' });
  }


  public welcome(token) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>("http://localhost:9191/", {headers, responseType: 'text' as 'json' });
  }
}