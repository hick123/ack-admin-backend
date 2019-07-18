import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders , } from '@angular/common/http';
import {GroupEvents} from '../models/groupevents';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {
  private listeventsspecific='http://localhost:3000/events/listeventsspecifics';
  private createGroupEvent ='http://localhost:3000/events/createevents';
  private listeventsspecificclusters='http://localhost:3000/events/listeventsspecificclusters';
  private createclusterevent ='http://localhost:3000/events/createclusterevent';
  private getallevents ='http://localhost:3000/events/getallevents';
  private geteventid='http://localhost:3000/events/geteventbyid'



  constructor(private http: HttpClient) { }
  listAllEvents(){
    return this.http.get(this.getallevents);
  }
  listGroupEventsById(churchgroups_id: String){
    console.log('event service sending ',churchgroups_id);
    const url =`${this.listeventsspecific}/${churchgroups_id}`;
    console.log('url............',url);
    return  this.http.get(url);    
  }
  createClusterEvent(data:any){
    console.log('cluster event creation...',data);
    return this.http.post(this.createclusterevent, data,httpOptions).pipe(tap((data: any) => console.log(data)
    ));
  }
  createEvent(data:any ){
    console.log('data event...',data);
    return this.http.post(this.createGroupEvent, data,httpOptions).pipe(tap((data: any) => console.log(data)
    ));
  }
  listClusterEventsById(clusters_id: String){
    console.log('event service sending ',clusters_id);
    const url =`${this.listeventsspecificclusters}/${clusters_id}`;
    console.log('url............',url);
    return  this.http.get(url);    
  }
  getEventById(churchevents_id:string){
    console.log('event service sending ',churchevents_id);
    const url =`${this.geteventid}/${churchevents_id}`;
    console.log('url............',url);
    return  this.http.get(url); 
  }
  }
     
