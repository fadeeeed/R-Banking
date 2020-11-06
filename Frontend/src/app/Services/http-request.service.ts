import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}

  public gethttpResponse(url, data): Observable<any> {
    console.log('Request is sent!');
    // Using the Get method
    const headers = {
      headers: new HttpHeaders({}),
    };
    console.log(url);
    return this.http.get(url, headers);
  }

  public posthttpRequest(url, data) {
    console.log('Request is sent!');
    // Using the POST method
    const headers = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        accept: 'application/json',
      }),
    };
    return this.http.post(url, data, headers);
  }
}
