import { Component, OnInit, Input } from '@angular/core';
import { NewsItem } from '../../models/newslistitem.model';
import { NewsApiService } from '../../services/news-api.service'

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})



export class NewsListComponent implements OnInit {
  @Input() domain : string = '';

  newsListItemArr: Array<{}> = [];
  newsItem: NewsItem = {          
    author:  "",
    content: "",
    description: "",
    publishedAt: "",
    source: {
      id: "",
      name: ""
    },
    title: "",
    url: "",
    urlToImage: ""
  };
    

  constructor( public newsApi: NewsApiService) {}


  ngOnInit() {
    console.log(this.domain);
    this.getSourceNews(this.domain);
    console.log(this.newsListItemArr);
  }

  getTopNewsItems() {
    this.newsApi.getTopNews().subscribe((data: any) => {
      console.log(data);
      data.articles.forEach(newsData => {
        this.newsItem = newsData;
        this.newsListItemArr.push(newsData);
      });
      return this.newsListItemArr
    }); 
  }

  getSourceNews(domain) {
    this.newsApi.getSourceNews(domain).subscribe((data: any) => {
      console.log(data);
      data.articles.forEach(newsData => {
        this.newsItem = newsData;
        let itemSource : string = this.newsItem.source.name;

        // if(this.newsListItemArr[itemSource] != undefined) {
        //   this.newsListItemArr[itemSource].push(this.newsItem);
        // } else {
        //   this.newsListItemArr[itemSource]= [this.newsItem];
        //  // this.newsListItemArr.splice(this.newsListItemArr.indexOf(itemSource), 0, this.newsItem);
        
        // }
        this.newsListItemArr.push(this.newsItem);
      });
      console.log( this.newsListItemArr);
     
      return this.newsListItemArr
    }); 
  }



}
