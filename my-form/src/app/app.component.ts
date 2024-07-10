import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-form';
  myid: any;
  myform: any;
  ngOnInit() {
    this.myform= new FormGroup({
      username : new FormControl(''),
      password : new FormControl('')
    });
  }

  display() {
    this.myid = localStorage.getItem("formdata");
  }

  onSubmit(){
    localStorage.setItem("formdata",JSON.stringify(this.myform.value));
    this.display();
  }

  onReset() {
    this.myform.reset();
    this.myid = '';
  }
}
