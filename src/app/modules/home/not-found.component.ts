import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/store/storage.service';

@Component({
  selector: 'ms-not-found',
  template: `
    <p>
      not-found works!
      {{ lastUrl }}
    </p>
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor(storage: StorageService) { }

  lastUrl: string;

  ngOnInit() {
  }

}
