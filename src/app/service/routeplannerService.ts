import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class RoutePlannerService {
  private apiUrl = 'https://redbus-clone-tedbus.onrender.com';

  constructor(private http: HttpClient) {}

  saveRoute(routeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/routeplannerRoutes/save`, routeData);
  }
}

export default RoutePlannerService;