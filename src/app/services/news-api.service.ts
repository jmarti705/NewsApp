import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()

export class NewsApiService {

  baseURL: string = 'https://newsapi.org/v2/';
  apiKey: string = 'API_KEY';
  params : any = {apiKey : this.apiKey};
  

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getTopNews() {   
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.apiKey)
    .pipe(
      catchError(this.handleError)
    )
  }

  getSourceNews(source) {
    return this.http.get('https://newsapi.org/v2/everything?domains=' + source + '&language=en&apiKey=' + this.apiKey)
    .pipe(
      catchError(this.handleError)
    )
  }

   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return errorMessage;
 }

}
