import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators   } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-form';
  myid: any;
  myform!: FormGroup;

  ngOnInit() {
    this.myform= new FormGroup({
      username : new FormControl('', [Validators.required, Validators.minLength(4)]),
      gmail : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.display();
  }

  display() {
    const formData = localStorage.getItem('formdata');
    this.myid = formData ? JSON.parse(formData) : '';
  }

  onSubmit(){
    if (this.myform.valid) {
      localStorage.setItem('formdata', JSON.stringify(this.myform.value));
      this.display();
    }
  }

  onReset() {
    this.myform.reset();
    this.myid = '';
  }
}
