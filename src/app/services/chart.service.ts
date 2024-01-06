import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  apiurl = 'https://www.ag-grid.com/example-assets/space-mission-data.json';

  constructor(public http: HttpClient) { }

  showData(){
    return this.http.get(this.apiurl);
  }
}
