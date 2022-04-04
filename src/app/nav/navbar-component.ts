import { Component } from '@angular/core';
import { EventService } from '../events';
import { IEvent, ISession } from '../events/shared/event.model';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav { font-size: 15px; }
    #searchForm { margin-right: 100px; }
    @media (max-width: 1200px) {#searchForm {display:none;}}
    li > a.active {color:#F97924;}
  `]
})
export class NavBarComponent {
  events:IEvent[]
  searchTerm = ""
  foundSessions: ISession[]
  constructor(public auth: AuthService, private eventService:EventService) {

  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe
      (sessions => {
      this.foundSessions = sessions
      })
  }

  ngOnInit() {
     this.eventService.getEvents().subscribe((data) => {
       this.events = data
     })
    }
}
