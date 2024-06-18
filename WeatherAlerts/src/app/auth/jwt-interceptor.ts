import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token && !req.url.includes('api.weather.gov')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
  return next(req);
};
