import { Component, OnInit } from '@angular/core';
import { PackageTypes } from '../../model/package-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  url: string;
  packageUrls: { [key in PackageTypes]?: string } = {
    [PackageTypes.npm]: 'https://docs.npmjs.com/about-npm',
    [PackageTypes.nuget]: 'https://docs.microsoft.com/en-us/nuget/what-is-nuget',
    [PackageTypes.extension]: 'https://code.visualstudio.com/docs/editor/extension-gallery'
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const index = +params.get('type');
      this.url = this.packageUrls[index];
    });
  }
}
