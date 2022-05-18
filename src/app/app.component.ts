import { NavbarComponent } from './navigation-components/navbar/navbar.component';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('main')
  main!:ElementRef;

  @ViewChild('navbar')
  navbar!: NavbarComponent;

  @ViewChild('changecolor')
  changecolor!: ElementRef;

  @ViewChild('setstate')
  setstate!: ElementRef;


  constructor(private auth: AuthService, private router: Router) {}
  

  // ngAfterViewInit() {
  //   if (this.auth.isLogged) {
  //     this.setstate.nativeElement.textContent = "LogOut";
  //   } 
  //    else {
  //      this.setstate.nativeElement.textContent = "LogIn";
  //      }
  // }

  // onChangeColor = () => {
  //   const currentcolor = this.main!.nativeElement.style.backgroundColor;
  //   let newcolor = "";
  //   if (currentcolor == "rgba(255, 255, 255, 0.78)") {
  //     this.changecolor.nativeElement.textContent = "WhiteMode";
  //     newcolor = "rgb(0, 0, 0)";
  //   } 
  //   else {
  //     this.changecolor.nativeElement.textContent = "DarkMode";
  //     newcolor = "rgba(255, 255, 255, 0.78)"
  //   } 
  //   this.main.nativeElement.style.backgroundColor=newcolor;
  // }

  // changeState() {
  //   if (this.auth.isLogged) {
  //     this.setstate.nativeElement.textContent = "LogIn";
  //     this.navbar?.logOut();
  //   }
  //   else {
  //     this.setstate.nativeElement.textContent = "LogOut";
  //     this.router.navigate(['/auth']);

  //   }
    
  // }


  
}
