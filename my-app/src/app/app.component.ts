import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  constructor(){

    console.log('foo?')
    console.log('testing?')
  }
  ngOnInit(){
  }
  onClick(){
    console.log('hello from the demo')
  }
}
