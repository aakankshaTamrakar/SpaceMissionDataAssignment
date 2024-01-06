import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import Chart from 'chart.js/auto';
import { Observable, observable } from 'rxjs';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  title = 'SpaceVue';

  data:any;

  public colDefs: ColDef[] = [
    { field: "mission", checkboxSelection:true },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "time"},
    { field: "price" },
    { field: "rocket" },
    { field: "successful" }
  ];

  public defaultColDefs: ColDef = {
    sortable:true,
    filter:true
  }

  public rowData$!:Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid! : AgGridAngular;

  constructor(
    public http: HttpClient, 
    public service: ChartService, 
    public authService: AuthService, 
    private router:Router){}


  onGridReady(params: GridReadyEvent) {
    this.rowData$  = this.http.get<any[]>('https://www.ag-grid.com/example-assets/space-mission-data.json');
  }

  onCellClicked(e: CellClickedEvent):void{
    console.log('cellClicked', e);
  }

  clearSelection():void{
    this.agGrid.api.deselectAll();
  }
  
  ngOnInit(){

  this.service.showData().subscribe(
      (res: any) => {
        this.data = res;

        // Check the property name in your actual response, it might be 'successful' instead of 'Success'
        const successfulMissions = res.filter((mission: any) => mission['successful'] === true).length;
        const failedMissions = res.length - successfulMissions;

        // console.log('Successful Missions:', successfulMissions);
        // console.log('Failed Missions:', failedMissions);

        this.showChartData(successfulMissions, failedMissions);
      }
    );
    
  }

  showChartData(successful: number, failed: number){
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Successful', 'Failed'],
        datasets: [
          {
            data: [successful, failed],
            backgroundColor: ['#1cc88a', '#e74a3b'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
 
}
