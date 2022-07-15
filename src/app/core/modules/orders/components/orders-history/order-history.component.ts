import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  orders,
  UserService
} from 'src/app/core/providers/user.service';
import {
  Observable} from 'rxjs';
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
  CellClickedEvent} from 'ag-grid-community';
import {
  Router
} from '@angular/router';



@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {


  orders$: Observable < orders[] | undefined > = new Observable;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular


  constructor(
    public user: UserService,
    public auth: AuthService,
    private router: Router,
    private store: Store < AppState > ) {}

  ngOnInit(): void {
    this.orders$ = this.getData();

  }

  getData(): Observable < orders[] | undefined > {
    return this.store.select(UserOrders).pipe(

    );
  }


  //GRID_OPTIONS

  onGridReady() {}

  onCellClicked = (event: CellClickedEvent) => {
    this.router.navigate(['/orders/order/' + event.data.id]);
  }

  formatSum(number: number) {
    return Number(number).toLocaleString("en-GB", {
      minimumFractionDigits: 2
    }) + "€";
  }

  formatDate(date: Date) {
    return date.toLocaleString('en-GB', {
      timeZone: 'UTC'
    });
  }

  chooseNationIcon(nation: string) {

    let flag = undefined;

    nation == 'Spain' ? flag = "es" :
      nation == 'Italy' ? flag = "it" :
      nation == 'England' ? flag = "gb" :
      nation == 'Germany' ? flag = "de" :
      nation == 'France' ? flag = "fr" :
      nation == 'United States' ? flag = "us" :
      undefined;
    return flag;
  }



  colDefs = [

    {
      headerName: 'Orders Details',
      children: [{
          field: "date",
          sortable: true,
          filter: true,
          cellRenderer: (params: {
            value: string;
          }) => {

            return "<span>" + this.formatDate(new Date(params.value)) + "</span>"
          }
        },

        {
          field: "total",
          sortable: true,
          filter: true,
          cellRenderer: (params: {
            value: string;
          }) => {
            return '<span>' + this.formatSum(Number(params.value)) + '</span>'
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

          cellRenderer: (params: {
            value: string;
          }) => {


            return `<img width="15" height="10" style="margin-bottom: 2px" src="../../../../../../assets/img/custom_img/flags/${this.chooseNationIcon(params.value)}.png" />  ` + params.value
          },
        },
        {
          field: "items",
          sortable: true,
          filter: true,
          cellRenderer: (params: {
            value: string;
          }) => {
            return params.value.length
          }

        }
      ]
    }


  ]




}
