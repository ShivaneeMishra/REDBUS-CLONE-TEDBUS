import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class RoutePlannerService {
  private apiUrl = 'http://localhost:8000'; // आपका बैकएंड पोर्ट

  constructor(private http: HttpClient) {}

  saveRoute(routeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/routeplannerRoutes/save`, routeData);
  }
}

export default RoutePlannerService;