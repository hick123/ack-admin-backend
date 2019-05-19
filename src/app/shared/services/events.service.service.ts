import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {
  private listeventsspecific='http://localhost:3000/events/listeventsspecific';


  constructor(private http: HttpClient) { }
  listGroupEventsById(churchgroups_id: String){
    console.log('event service sending ',churchgroups_id);
    const url =`${this.listeventsspecific}/${churchgroups_id}`;
    console.log('url............',url);
    return  this.http.get(url);    
  }
  createEvent(){
    
  }
  }
  
