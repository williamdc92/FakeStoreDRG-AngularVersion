import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  public isLoading = false;
  private loadingSubscription = new Subscription();

  @ViewChild('componentSpinner') componentSpinner: ElementRef<HTMLElement> | undefined;

  constructor(private spinnerService: SpinnerService) {

    this.loadingSubscription = this.spinnerService.isLoading$.subscribe((state: boolean) => {
      this.isLoading = state;
    });
   }
   
  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.componentSpinner?.nativeElement.setAttribute('style', 'display: none');
  }

  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }

}
