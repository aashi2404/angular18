import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('changeTextSize', [
      state('initial', style({
        fontSize: '24px'
      })),
      state('final', style({
        fontSize: '48px'
      })),
      transition('initial => final', animate('1500ms')),
      transition('final => initial', animate('1000ms'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  title = 'my-form';
  myid: any;
  myform: any;
  users: any[] = [];
  errorMessage: string = '';
  showUserList: boolean = false;
  color = '#F8C8DC';
  currentState = 'initial';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.myform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      gmail: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@reqres\.in$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  display() {
    console.log(localStorage.getItem('mytoken'));
  }

  onSubmit() {
    if (this.myform.valid) {
      const data = {
        email: this.myform.value.gmail,
        password: this.myform.value.password
      };
      console.log('email', data.email);
      console.log('password', data.password);
      this.http.post('https://reqres.in/api/login', data).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          if (response && response.token) {
            localStorage.setItem('mytoken', response.token);
            this.getUserList();
          }
        },
        error: (error: any) => {
          console.error('Error:', error);
          this.showUserList = false;
        }
      });
      console.log('Form is valid');
    } else {
      this.myform.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  getUserList() {
    this.http.get('https://reqres.in/api/users?page=2').subscribe({
      next: (response: any) => {
        console.log('Users fetched:', response);
        this.users = response.data;
        this.showUserList = this.users.length > 0;;
      },
      error: (error) => {
        console.log('Get users error:', error);
        this.showUserList = false;
      }
    });
  }

  onReset() {
    this.myform.reset();
    localStorage.removeItem('formdata');
    this.myid = null;
    this.users = [];
    this.errorMessage = '';
    this.showUserList = false;
  }

  validateUser() {
    const email = this.myform.value.gmail;
    const password = this.myform.value.password;
    if (this.authService.validateUser(email, password)) {
      console.log('User is valid');
      alert('User is valid');
    } else {
      console.log('User is not valid');
      alert('User is not valid');
    }
  }
}
