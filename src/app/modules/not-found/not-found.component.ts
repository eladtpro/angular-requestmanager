import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ms-not-found',
  template: `
    <h1>
      404
    </h1>
    <h3>
      Oops! Page not found
    </h3>
    <p>Sorry, but the page you are looking for is not found. Please make sure you have typed the current URL.</p>
    <p *ngIf="path">You might want to go to <a [routerLink]="path">"{{ path | title }}"</a> page</p>
  `,
  styles: ['h1 { font-weight: normal; font-size: 112px; color: #3498DB; }']
})
export class NotFoundComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  path: string;

  ngOnInit() {
    this.route.data.pipe(take(1))
      .subscribe((data: { path: string }) => {
        this.path = data.path;
      });
  }
}
