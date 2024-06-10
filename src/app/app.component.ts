import { Component } from '@angular/core';
import { RideService } from './services/ride.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RideAssistFrontend';

  constructor(private service:RideService) {

  
  }

}
