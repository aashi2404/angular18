import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http : HttpClient) { }

  title = 'my-form';
  myid: any;
  myform: any;
  users: any[] = [];
  errorMessage: string = '';

  ngOnInit() {

      this.myform= new FormGroup({
        username : new FormControl('', [Validators.required, Validators.minLength(4)]),
        gmail : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),
        password: new FormControl('', [Validators.required, Validators.minLength(5)])
      });

    this.getUserList();
  }

  display() {
    console.log(localStorage.getItem('mytoken'));
  }

  onSubmit() {

    const data = {
             email: this.myform.value.gmail,
             password: this.myform.value.password
         };

    this.http.post('https://reqres.in/api/login', data).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        if (response && response.token) {
          localStorage.setItem('mytoken', response.token);
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  getUserList() {
    this.http.get('https://reqres.in/api/users?page=2').subscribe({
      next: (response: any) => {
        console.log('Users fetched:', response);
      },
      error: (error) => {
        console.log('Get users error:', error);
      }
    });
  }
  
  onReset() {
    this.myform.reset();
    localStorage.removeItem('formdata');
    this.myid = null;
    this.users = [];
    this.errorMessage = '';
  }

}