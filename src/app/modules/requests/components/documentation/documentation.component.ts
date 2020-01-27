import { Component, OnInit } from '@angular/core';
import { PackageType } from '../../model/package-type';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'ms-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) {
    this.route.paramMap.subscribe(params => {
      const index = +params.get('type');
      this.url = this.getPackageUrl(index);
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      // console.log('fetching', this.url);
      // this.http.get(this.url).subscribe(html => console.warn);
      // pipe(
      //   tap(
      //     response => console.log("logging response both bad and ok..."),
      //     error => console.log("Something exploded, call 911")));
      // .subscribe(html => console.log('fetch complete', html))
      // .pipe(
      //   tap(html => console.log),
      //   map((html: any) => {
      //     console.log('fetch complete', html);
      //     this.content = html;
      //     // html = this.sanitizer.bypassSecurityTrustHtml(html);
      //   }));
      // });
    });
  }

  url: string;
  sanitizedUrl: SafeResourceUrl;
  content: string;
  getPackageUrl = (type: PackageType): string => {
    let location: string;
    switch (type) {
      case PackageType.npm:
        location = 'https://docs.npmjs.com/about-npm';
        break;
      case PackageType.nuget:
        location = 'https://en.wikipedia.org/wiki/NuGet';
        break;
      case PackageType.vs_extension:
        location = 'https://www.dunebook.com/visual-studio-code-extensions/';
        break;
      default:
        location = '/404';
        // this.router.navigateByUrl('/404');
        break;
    }
    return location;
  }
}
