import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHandlerFn
} from '@angular/common/http';
import { environment } from '../../environments/environment';


export function SpooncularInterceptor(request: HttpRequest<unknown>,  next: HttpHandlerFn) {
  if (request.url.indexOf(environment.nutritionXBaseUrl) !== -1) {
    //inject apiKey
    const authReq = request.clone({
      setHeaders: {
        'x-app-id': environment.nutriotionXAppId,
        'x-app-key': environment.nutritionXApiKey,
        'x-remote-user-id': '0'
      }
    })

    return next(authReq);
  }

  return next(request);

}
