import { Component, Output } from '@angular/core';
import { NewsDomainArray } from './models/newsdomain.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  domains : NewsDomainArray = new NewsDomainArray();
  domainsArray  = this.domains.newsDomainArry;
  title = 'app';
}
