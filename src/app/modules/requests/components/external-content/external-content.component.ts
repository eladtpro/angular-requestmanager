import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ms-external-content',
  templateUrl: './external-content.component.html'
})
export class ExternalContentComponent implements OnInit {

  @Input() src: string;
  html: string;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    console.log(this.src);
    this.http.get(this.src).pipe(map((html: any) => {
      html = this.sanitizer.bypassSecurityTrustHtml(html);
    }));

  // TODO: embed angular elements
    // this.route.paramMap.subscribe(params => {
    //   const index = +params.get('type');
    //   this.url = this.packageUrls[index];
    // });
  }
}
