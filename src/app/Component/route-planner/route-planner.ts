import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { url } from '../../config/index';
import RoutePlannerService from '../../service/routeplannerService';


declare let L: any;

@Component({
  selector: 'app-route-planner',
  standalone: false,
  templateUrl: './route-planner.html',
  styleUrls: ['./route-planner.css'],
})
export class RoutePlanner implements AfterViewInit {
  startLocation: string = '';
  destination: string = '';
  waypoints: any[] = [];
  suggestedRoutesList: any[] = [];
  selectedRouteIndex: number | null = null;
  map: any;
  allLatLngs: any[] = []; 
  routeLayers: any[]=[];


  constructor(private http: HttpClient, private  translate:TranslateService , private snackBar:MatSnackBar,
     private routePlannerService: RoutePlannerService) {}
  addWaypoint(): void {
    this.waypoints.push({ name: '' });
  }
  removeWaypoint(index: number): void {
    this.waypoints.splice(index, 1);
  }
  suggestRoutes(): void {

      if (this.routeLayers && this.routeLayers.length > 0) {
    this.routeLayers.forEach(layer => {
      if (this.map) {
        this.map.removeLayer(layer);
      }
    });
    this.routeLayers = [];
  }


    if (!this.startLocation || !this.destination) {
      this.snackBar.open(this.translate.instant('ALERT_ENTER_BOTH_LOCATIONS'),'Close',{duration:3000});
      return;
    }

    const startUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.startLocation)}`;
    const destUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.destination)}`;

    this.http.get<any[]>(startUrl).subscribe((startRes) => {
      if (!startRes || startRes.length === 0) {
        this.snackBar.open(this.translate.instant('START_NOT_FOUND'),'Close',{duration:3000});
        return;
      }
      const startLon = startRes[0].lon;
      const startLat = startRes[0].lat;

      this.http.get<any[]>(destUrl).subscribe((destRes) => {
        if (!destRes || destRes.length === 0) {
        this.snackBar.open(this.translate.instant('DEST_NOT_FOUND'),'Close',{duration:3000});
          return;
        }
        const destLon = destRes[0].lon;
        const destLat = destRes[0].lat;

        
const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${destLon},${destLat}?overview=full&geometries=geojson&alternatives=true`;

this.http.get(osrmUrl).subscribe((res: any) => {
  if (res.routes && res.routes.length > 0) {
    
    this.suggestedRoutesList = res.routes.map((route: any, index: number) => {
      const distanceInKm = (route.distance / 1000).toFixed(1) + ' km';
      const durationInMin = Math.round(route.duration / 60) + ' mins';
      const routeNames = [
  this.translate.instant('PRIMARY_FAST_ROUTE'), 
  this.translate.instant('ALT_ROUTE_1'), 
  this.translate.instant('ALT_ROUTE_2')
];
      
      return {
        name: routeNames[index] || `Route ${index + 1}`,
        distance: distanceInKm,
        time: durationInMin
      };
    });

    res.routes.forEach((route: any, index: number) => {
  if (route.geometry && route.geometry.coordinates && this.map) {
   
    const coords = route.geometry.coordinates.map((c: any) => [c[1], c[0]]);
    const colorChoice = index === 0 ? 'blue' : 'orange';
    
   
    const polyline = L.polyline(coords, { color: colorChoice, weight: 5, opacity: 0.7 }).addTo(this.map);
    this.routeLayers.push(polyline);
    
    
    this.allLatLngs.push(...coords); 
  }
});


if (this.allLatLngs.length > 0 && this.map) {
  this.map.fitBounds(L.latLngBounds(this.allLatLngs));
}

  }
}, err => {
  console.error('OSRM Error:', err);
});
      });
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = L.map('map').setView([19.2437, 73.1355], 13);
      (window as any).myLeafletMap = this.map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);
      const apiKey =
        'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImJlY2MyOTUyY2RlZDRkOWNhMTQ1NmY1MDBlYzA4MzJhIiwiaCI6Im11cm11cjY0In0=';
      const trafficLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
        {
          maxZoom: 19,
          opacity: 0.6,
        },
      );

     
      const baseMaps = { OpenStreetMap: this.map };
      const overlayMaps = { 'Live Traffic / Weather': trafficLayer };
      L.control.layers(baseMaps, overlayMaps).addTo(this.map);

      L.marker([19.2437, 73.1355]).addTo(this.map).bindPopup('<b>Start Location</b>').openPopup();
    }
  }
  trackByFn(index: number, item: any): any {
  return index;
}
  compareRoutes(): void {
    if (this.suggestedRoutesList.length === 0) {
      this.snackBar.open(this.translate.instant('ALERT_SUGGEST_ROUTES_FIRST'),'Close',{duration:3000});
      return;
    }

    let bestRoute = this.suggestedRoutesList[0];
    let comparisonText = this.translate.instant('COMPARE_TITLE');

    this.suggestedRoutesList.forEach((route, index) => {
      comparisonText += `${index + 1}. ${route.name}\n   Distance: ${route.distance} | Time: ${route.time}\n\n`;
    });

    comparisonText += ` ⁠ \n${this.translate.instant('RECOMMENDATION')} ${bestRoute.name} ${this.translate.instant('IS_OPTIMAL')} `;

    this.snackBar.open(comparisonText),'Close',{duration:3000};
  }

  saveRoute(): void {
    if (this.selectedRouteIndex === null || this.suggestedRoutesList.length === 0) {
      this.snackBar.open(this.translate.instant('ALERT_SELECT_ROUTE_TO_SAVE'),'Close',{duration:3000});
      return;
    }

    const chosenRoute = this.suggestedRoutesList[this.selectedRouteIndex];

    const routeData = {
      startLocation: this.startLocation,
      destination: this.destination,
      waypoints: this.waypoints,
      routeName: chosenRoute.name,
      distance: chosenRoute.distance,
      time: chosenRoute.time,
    };

   
    this.routePlannerService.saveRoute(routeData).subscribe(
      (response: any) => {
       this.snackBar.open(this.translate.instant('ROUTE_SAVED_SUCCESS'),'Close',{duration:3000});
        console.log(response);
      },
      (error) => {
        console.error('Error saving route:', error);
      },
    );
  }

  selectRoute(index: number): void {
    this.selectedRouteIndex = index;
    const chosenRoute = this.suggestedRoutesList[index];
    console.log('Selected Route:', chosenRoute.name);
  }
}
