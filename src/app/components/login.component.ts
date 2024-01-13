import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ILogin } from '../models';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex min-h-screen">
      <div class="relative hidden w-0 flex-1 lg:block">
        <img
          class="absolute inset-0 h-full w-full object-cover object-bottom"
          src="https://images.pexels.com/photos/12942771/pexels-photo-12942771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div
        class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
      >
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              class="h-12 w-auto"
              src="https://media.licdn.com/dms/image/D4D0BAQHfv78EbBr8PA/company-logo_200_200/0/1688217183283/binder_sa_logo?e=1713398400&v=beta&t=H2tZdPvIrZAKHVo9BkrEddFY5YfgVvEi_WU1MJK8so4"
              alt="Your Company"
            />
            <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign In To Your Account
            </h2>
            <!-- <p class="mt-2 text-sm text-gray-600">
          Or
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a>
        </p> -->
          </div>

          <div class="mt-8">
            <div class="mt-6">
              <form
                class="space-y-3"
                [formGroup]="loginForm"
                (ngSubmit)="handleSubmit()"
              >
                <!-- username -->
                <div class="">
                  <label
                    for="username"
                    class="block text-sm font-medium text-gray-700"
                    >username</label
                  >
                  <div class="relative ">
                    <input
                      formControlName="username"
                      [ngClass]="{
                        'input-invalid':
                          loginForm.controls['username'].errors &&
                          loginForm.controls['username'].touched,
                        input: !loginForm.controls['username'].touched,
                        'input-valid':
                          loginForm.controls['username'].touched &&
                          !loginForm.controls['username'].errors
                      }"
                      id="username"
                      name="username"
                      autocomplete="username"
                      required
                    />

                    <!-- Error Icon -->
                    <div
                      *ngIf="
                        loginForm.controls['username'].errors &&
                        loginForm.controls['username'].touched
                      "
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg
                        class="h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>

                    <!-- Success Icon -->
                    <div
                      *ngIf="
                        !loginForm.controls['username'].errors &&
                        loginForm.controls['username'].touched
                      "
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg
                        class="h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"
                        />
                      </svg>
                    </div>
                  </div>

                  <p
                    *ngIf="loginForm.controls['username'].errors?.['required'] && loginForm.controls['username'].touched"
                    class="mt-1 ml-2 text-sm text-red-600"
                  >
                    username is Required.
                  </p>
                </div>

                <!-- Password -->
                <div class="">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                  >
                  <div class="relative ">
                    <input
                      formControlName="password"
                      [ngClass]="{
                        'input-invalid':
                          loginForm.controls['password'].errors &&
                          loginForm.controls['password'].touched,
                        input: !loginForm.controls['password'].touched,
                        'input-valid':
                          loginForm.controls['password'].touched &&
                          !loginForm.controls['password'].errors
                      }"
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                    />

                    <!-- Error Icon -->
                    <div
                      *ngIf="
                        loginForm.controls['password'].errors &&
                        loginForm.controls['password'].touched
                      "
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg
                        class="h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>

                    <!-- Success Icon -->
                    <div
                      *ngIf="
                        !loginForm.controls['password'].errors &&
                        loginForm.controls['password'].touched
                      "
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg
                        class="h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"
                        />
                      </svg>
                    </div>
                  </div>

                  <p
                    *ngIf="loginForm.controls['password'].errors?.['required'] && loginForm.controls['password'].touched"
                    class="mt-1 ml-2 text-sm text-red-600"
                  >
                    Password is Required.
                  </p>
                  <p
                    *ngIf="loginForm.controls['password'].errors?.['minlength'] && loginForm.controls['password'].touched"
                    class="mt-1 ml-2  text-sm text-red-600"
                  >
                    Password must be at least 6 characters
                  </p>
                </div>

                <div class="flex items-center justify-between gap-5">
                  <div class="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-0"
                    />
                    <label
                      for="remember-me"
                      class="ml-2 block text-sm text-gray-900 capitalize"
                      >Remember me
                    </label>
                  </div>

                  <div class="text-sm">
                    <a
                      routerLink="/signup"
                      class=" font-medium text-indigo-600 hover:text-indigo-500 capitalize"
                      >Forget Password ?</a
                    >
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    [disabled]="loginForm.status == 'INVALID' || loading"
                    class=" w-full  rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 inline-flex items-center justify-center gap-3 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                  >
                    Log In

                    <svg
                      *ngIf="loading"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="-ml-1 mr-2 h-5 w-5 animate-spin"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8.175 7.377l-3.042-5.27 1.732-1 3.045 5.273c-.635.238-1.222.573-1.735.997zm-.799.8l-5.27-3.042-1 1.732 5.274 3.045c.237-.635.572-1.223.996-1.735zm-1.376 3.823c0-.341.035-.673.09-.999h-6.09v1.999h6.09c-.055-.326-.09-.659-.09-1zm11.351-2.705l5.208-3.007-.333-.577-5.206 3.007c.121.185.23.379.331.577zm-5.351-3.295c.341 0 .673.035.999.09v-6.09h-1.999v6.09c.326-.055.659-.09 1-.09zm3.14.894l3.004-5.204-.288-.166-3 5.197.284.173zm1.685 8.662l5.234 3.022.666-1.154-5.229-3.019c-.181.41-.408.794-.671 1.151zm-10.444-1.467l-5.274 3.046 1 1.732 5.27-3.042c-.424-.513-.759-1.1-.996-1.736zm11.594-2.589l.025.5-.025.5h6.025v-1h-6.025zm-3.727 6.061l3.03 5.249 1.442-.833-3.031-5.25c-.437.34-.92.623-1.441.834zm-2.248.439c-.341 0-.674-.035-1-.09v6.09h1.999v-6.09c-.326.055-.658.09-.999.09zm-3.824-1.376l-3.042 5.27 1.732 1 3.045-5.274c-.635-.237-1.222-.572-1.735-.996z"
                      />
                    </svg>
                  </button>
                </div>

                <div class="flex items-center justify-start gap-5">
                  <div class="flex items-center">
                    <div class="ml-2 block text-sm text-gray-900 capitalize">
                      don't have an account
                    </div>
                  </div>

                  <div class="text-sm">
                    <a
                      routerLink="/signup"
                      class=" font-medium text-indigo-600 hover:text-indigo-500 capitalize"
                      >Create One</a
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  public loginForm = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  loading: boolean = false;

  constructor(
    private authentication: AuthService,
    private toastr: MessageService,
    private router: Router,
    private _fb: FormBuilder
  ) {
    console.log(' this.loginForm: ', this.loginForm);
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authentication.onLogin(this.loginForm.value as ILogin);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
}
