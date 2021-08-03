import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { HttpInterceptor } from '@angular/common/http';


@Injectable()

export class TokenInterceptorServiceService implements HttpInterceptor{

  constructor(private loginService: LoginService){}

  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }){
    console.log('INTERCEPTOR');
    let token = this.loginService.getAuthToken();
    
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'login '+token
      }
    })
    return next.handle(tokenizedReq);
  }
}

/*@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor{

  // We inject a LoginService
  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    // We retrieve the token, if any
    const token = this.loginService.getAuthToken();
    console.log('INTERCEPTOR' + token);
    
    let newHeaders = req.headers;
    if (token != null || token != "") {
     
      // If we have a token, we append it to our new headers
      newHeaders = newHeaders.append('authtoken', token);
    }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({ headers: newHeaders });
    
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
  }
}*/
