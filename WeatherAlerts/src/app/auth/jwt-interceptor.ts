import { HttpInterceptorFn } from '@angular/common/http';
import { AuthConstants} from "./auth-constants";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(AuthConstants.TOKEN_NAME);
  if (token && !req.url.includes('api.weather.gov')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
  return next(req);
};
