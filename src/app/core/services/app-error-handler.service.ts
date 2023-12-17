import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AppErrorHandlerService implements ErrorHandler {

  constructor(private snackbar: MatSnackBar, private ngZone: NgZone) { }

  handleError(error: unknown): void {
    this.ngZone.run(() => {
      this.snackbar.open(
        `Error: ${error}`,
        'Close',
        {
          duration: 2000
        }
      )
    })
  }
}
