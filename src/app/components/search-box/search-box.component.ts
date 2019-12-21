import { Component, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';

import { NewsItem } from '../../models/newslistitem.model';
import { NewsDomainArray } from '../../models/newsdomain.model';
import { NewsApiService } from '../../services/news-api.service';
import { EventEmitter } from 'events';
import { NewsListItemArray } from '../../models/newslistitemArray.model';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {


  constructor( public newsApi: NewsApiService) { }
  @Input() domain : string = '';
  @Output() newsListArraySearch = new EventEmitter();

  ngOnInit() {
  }

  @Input() newsListItemArr :  Array<{}> = [];
  newsItem: NewsItem = new NewsItem();
  newsDomains: NewsDomainArray = new NewsDomainArray();
  countDownDomains: number = 0;
  noSearchResults : Array<boolean> = [];

  // get news based on search provided text
  getSearchText(searchText) {
    let searchTextStr = `${searchText}`;    
    this.noSearchResults = [];
    this.countDownDomains = this.newsDomains.newsDomainArry.length;
    this.newsDomains.newsDomainArry.forEach(domain => {
      this.newsApi.getSourceNews(domain, searchTextStr).subscribe((data: NewsListItemArray) => {
 
        if(data.articles.length == 0) {
          this.noSearchResults.push(true);
          this.countDownDomains -= 1;
        };
        
        // provide no results msg check if last returned with and zero results found
        if(this.countDownDomains == 0 && this.noSearchResults.indexOf(false) === -1) {
          alert("no results");
        };
      });
    });
  }
}
