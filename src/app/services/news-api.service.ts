import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AggregateTitleService} from '../services/aggregate-title.service'

@Injectable()

export class NewsApiService {


  baseURL: string = 'https://newsapi.org/v2/';
  apiKey: string = 'API_KEY';
  params: any = {
    'apiKey': this.apiKey,

  };


  constructor(private http: HttpClient) { }

  aggregateTitleService : AggregateTitleService = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getTopNews() {
    this.params["country"] = 'us';
    return this.http.get(this.baseURL + 'top-headlines', {
      params: this.params
    })
      .pipe(
        catchError(this.handleError)
      )
  }

  getSourceNews(source) {
    this.params.domains = source;
    this.params.language = 'en';
    return this.http.get( this.baseURL + 'everything', {
      params : this.params
    })
      .pipe(map(data => { 
          return data
        })
      )
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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
