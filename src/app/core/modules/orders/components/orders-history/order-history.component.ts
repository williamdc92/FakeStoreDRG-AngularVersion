import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {
  orders,
  UserService
} from 'src/app/core/providers/user.service';
import {
  catchError,
  Observable,
  of ,
  switchMap,
  tap
} from 'rxjs';
import {
  AuthService
} from 'src/app/core/providers/auth.service';
import {
  AppState
} from 'src/app/store/app.state';
import {
  Store
} from '@ngrx/store';
import {
  AgGridAngular
} from 'ag-grid-angular';
import {
  UserOrders
} from 'src/app/store/currentUser/currentuser.selector';
import {
  CellClickedEvent,
  ColDef,
  GridOptions
} from 'ag-grid-community';
import {
  Router
} from '@angular/router';
import {
   AngularEmojisModule
  } from 'angular-emojis';



@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  
  orders$: Observable < orders[] | undefined > = new Observable;

  test = 
  {
    date: "25/05/2022",
    total: 1000,
    id: "test",
    evaded: "false",
    nations: "United States"
  }
  
  @ViewChild(AgGridAngular) agGrid! : AgGridAngular


  constructor(
    public user: UserService,
    public auth: AuthService,
    private router: Router,
    private store: Store < AppState >) {}

  ngOnInit(): void {
    this.orders$ = this.getData();
    
  }

  getData(): Observable < orders[] | undefined > {
    return this.store.select(UserOrders).pipe(
      
    );
  }


  //GRID_OPTIONS

  onGridReady () {
  }

  onCellClicked = (event: CellClickedEvent) => {
    this.router.navigate(['/orders/order/' + event.data.id]);
  }



  colDefs = [

    {
      headerName: 'Orders Details',
      children: [
        {
          field: "date",
          sortable: true,
          filter: true,
          cellRenderer: function (params: {value: string;}) {
    
            return "<span>" +new Date(params.value) + "</span>" 
          }
        },
    
        {
          field: "total",
          sortable: true,
          filter: true,
          cellRenderer: function (params: {value: string;}) {
            return '<span><i class="material-icons" style="font-size:17px">euro</i>' + params.value + '</span>'
          }
        },
    
        {
          field: "id"
        },
    
        {
          field: "evaded",
          sortable: true,
          filter: true
        },
    
        {
          field: "nations",
          sortable: true,
          filter: true,
    
          cellRenderer: function (params: {value: string;}) {
            let flag = undefined;
    
            params.value == 'Spain' ? flag ="es" 
            : params.value=='Italy' ? flag ="it" 
              : params.value=='England' ? flag ="gb" 
                : params.value=='Germany' ? flag ="de" 
                : params.value=='France' ? flag ="fr" 
             : params.value=='United States' ? flag ="us" 
            : undefined;
    
            return `<img width="15" height="10" style="margin-bottom: 2px" src="../../../../../../assets/img/custom_img/flags/${flag}.png" />  ` + params.value 
          },
        },
        {
          field: "items",
          sortable: true,
          filter: true,
          cellRenderer: function (params: {value: string;}) {
            return params.value.length
          }
        
        }
      ]
  }

    
  ]



}
