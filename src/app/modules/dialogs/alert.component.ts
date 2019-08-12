import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// TODO: publish into repository
@Component({
  selector: 'ms-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  message = '';
  cancelButtonText = 'Cancel';
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AlertComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('300vw', '300vw');
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
