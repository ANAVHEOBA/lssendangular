import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../lib/login/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = null;

      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']); // Or wherever you want to redirect after login
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.error = err.error?.message || 'Login failed. Please check your credentials.';
        }
      });
    }
  }
}
