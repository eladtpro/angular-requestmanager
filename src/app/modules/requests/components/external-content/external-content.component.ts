import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-external-content',
  templateUrl: './external-content.component.html',
  styleUrls: ['./external-content.component.css']
})
export class ExternalContentComponent implements OnInit {

  url: string;

  constructor() { }

  // TODO: embed angular elements
  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   const index = +params.get('type');
    //   this.url = this.packageUrls[index];
    // });
  }
}
