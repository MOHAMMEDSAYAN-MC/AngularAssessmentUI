import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AssessmentUI';
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
