import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // Client error
            errorMessage = `${error.error.message}`;
          } else {
            // Api error response
            if (error.status === 0) {
              errorMessage = 'Could not connect to server';
            } else {
              errorMessage = `${error.statusText}`;
            }

            if (error.status >= 500) {
              window.alert(errorMessage);
            }
          }

          return throwError(errorMessage);
        })
      )
  }
}
