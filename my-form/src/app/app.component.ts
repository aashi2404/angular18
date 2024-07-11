import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'my-form'
}

// import { Component,OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators   } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit{
//   title = 'my-form';
//   myid: any;
//   myform!: FormGroup;
//   users: any[] = [];
//   errorMessage: string = '';

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.myform= new FormGroup({
//       username : new FormControl('', [Validators.required, Validators.minLength(4)]),
//       gmail : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),
//       password: new FormControl('', [Validators.required, Validators.minLength(5)])
//     });
//   }

//   display() {
//     const formData = localStorage.getItem('formdata');
//     this.myid = formData ? JSON.parse(formData) : null;
//   }

//   onSubmit(){
//     if (this.myform.valid) {
//       const loginData = {
//         email: this.myform.value.gmail,
//         password: this.myform.value.password
//       };

//       console.log('Attempting login with:', loginData);

//       this.http.post('https://reqres.in/api/login', loginData).subscribe({
//         next: (response: any) => {
//           console.log('Login successful:', response);
//           this.getUsers();
//         },
//         error: (error) => {
//           console.error('Login error:', error);
//           this.errorMessage = 'Invalid credentials';
//           this.users = [];
//         }
//       });
//     } else {
//       this.myform.markAllAsTouched();
//       console.log('Form is invalid');
//     }
//   }

//   getUsers() {
//     this.http.get('https://reqres.in/api/users?page=2').subscribe({
//       next: (response: any) => {
//         console.log('Users fetched:', response);
//         this.users = response.data;
//         this.errorMessage = '';
//       },
//       error: (error) => {
//         console.error('Get users error:', error);
//         this.errorMessage = 'Failed to load users';
//         this.users = [];
//       }
//     });
//   }


//   onReset() {
//     this.myform.reset();
//     localStorage.removeItem('formdata');
//     this.myid = null;
//     this.users = [];
//     this.errorMessage = '';
//   }
// }
