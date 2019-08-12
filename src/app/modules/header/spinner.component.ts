import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { SubSink } from 'subsink';
import { SpinnerService } from '../../shared/services/spinner.service';

const LOADING_IMG = '../../../../../assets/images/colorful_loader.gif';
const IDLE_IMG = '../../../../../assets/images/azurelogo-1.png';

@Component({
  selector: 'ms-spinner',
  template: `
    <img #logo alt="Microsoft Logo" src="${IDLE_IMG}" aria-hidden="true" style="height: 46px;">
  `,
  styles: []
})

export class SpinnerComponent implements OnInit, OnDestroy {
  constructor(private loader: SpinnerService, private renderer: Renderer2) { }

  // @ViewChild(ElementRef, { static: false }) logo: ElementRef;
  @ViewChild('logo', { static: true }) logo: ElementRef;
  private subs = new SubSink();

  ngOnInit(): void {
    this.toggleSpinner(true);
    this.loader.subscribe(spinning => {
      this.toggleSpinner(spinning);
    },
      () => this.toggleSpinner(false),
      () => this.toggleSpinner(false));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggleSpinner(spinning: boolean) {
    this.renderer.setAttribute(this.logo.nativeElement, 'src', spinning ? LOADING_IMG : IDLE_IMG);
  }
}
