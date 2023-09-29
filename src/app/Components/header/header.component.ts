import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router:Router){}

  isHomePage(): boolean {
    return this.router.url === '/';
  }
  isPolicyInsuredDetailsPage(): boolean {
    return this.router.url === '/PolicyInsuredDetails';
  }

  logout(){
    const confirmation=confirm('Do yo wnat to logout');
    if(confirmation){
      localStorage.removeItem('token');
      this.router.navigate(['/Login']);
    }
        
  }
}
