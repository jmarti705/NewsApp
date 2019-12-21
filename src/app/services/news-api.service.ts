import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AggregateTitleService } from '../services/aggregate-title.service'

import { NewsItem } from '../models/newslistitem.model';
import { NewsListItemArray } from '../models/newslistitemArray.model';
import { NewsDomain } from '../models/newsdomain.model';

@Injectable()

export class NewsApiService {

  constructor(private http: HttpClient) { }

  newsDomain: NewsDomain = new NewsDomain();
  newsListItemsArray : NewsItem[] = [];
  newsListItems = new Subject<NewsItem[]>();
  newsItem: NewsItem = new NewsItem();
  baseURL: string = 'https://newsapi.org/v2/';
  apiKey: string = '';
  params: any = {
    'apiKey': this.apiKey,

  };

  aggregateTitleService: AggregateTitleService = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getTopNews() {
    this.params["country"] = 'us';
    return this.http.get<NewsListItemArray>(this.baseURL + 'top-headlines', {
      params: this.params
    })
      .pipe(map(data => {
        data.articles.forEach(newsData => {
          this.newsItem = newsData;
          this.newsListItemsArray.push(this.newsItem);
          this.newsListItems.next(this.newsListItemsArray);
        });
        return data
      }),
        catchError(this.handleError)
      )
  }

  getSourceNews(domain, searchTextStr) {
    this.newsListItemsArray = [];
    this.params.domains = domain;
    this.params.language = 'en';
    this.params.q = searchTextStr;
    console.log(searchTextStr);
    return this.http.get<NewsListItemArray>(this.baseURL + 'everything', {
      params: this.params
    })
      .pipe(map(data => {
        data.articles.forEach(newsData => {
  
          if(newsData.source.name == this.newsDomain.sources[domain].name) {
            this.newsListItemsArray.push(newsData);
            this.newsListItems.next(this.newsListItemsArray);
          };     
        });
        return data
      }),
        catchError(this.handleError)
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
