import { Component, OnInit } from '@angular/core';
import { PackageType } from '../../model/package-type';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ms-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  url: string;
  packageUrls: { [key in PackageType]?: SafeResourceUrl } = {
    [PackageType.npm]: this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.npmjs.com/about-npm'),
    [PackageType.nuget]: this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.microsoft.com/en-us/nuget/what-is-nuget'),
    [PackageType.vs_extension]: this.sanitizer.bypassSecurityTrustResourceUrl('https://code.visualstudio.com/docs/editor/extension-gallery')
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const index = +params.get('type');
      this.url = this.packageUrls[index];
    });
  }
}
