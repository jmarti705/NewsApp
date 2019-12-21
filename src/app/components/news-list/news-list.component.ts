import { Component, OnInit, Input, Output } from '@angular/core';
import { NewsItem } from '../../models/newslistitem.model';
import { NewsApiService } from '../../services/news-api.service'

import { NewsListItemArray } from '../../models/newslistitemArray.model';
import { NewsDomain } from '../../models/newsdomain.model';
import { throttleTime } from 'rxjs/operator/throttleTime';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})



export class NewsListComponent implements OnInit {
  @Input() domain: string = '';
  newsListItemArr = [];
  newsItem: NewsItem = new NewsItem();
  newsDomain: NewsDomain = new NewsDomain();

  constructor(public newsApi: NewsApiService) { }


  ngOnInit() {
    this.updateNewListArr(); 
    this.getSourceNews(this.domain);
  }

  getTopNewsItems() {

  }

  // Subscribe to the neww articles list to update on changes feom the newsapi service (i.e. .next(data))
  updateNewListArr() {
    this.newsApi.newsListItems.subscribe( data => {
      this.newsListItemArr.push(data);

      this.newsListItemArr = data.filter(newsData => 
        newsData.source.name == this.newsDomain.sources[this.domain].name
      );
    });
  }

  // get news based on the domains provided via @Input
  getSourceNews(domain) {
    this.newsApi.getSourceNews(domain, '').subscribe((data: any) => {
      console.log(data);  
    });
  }

}

