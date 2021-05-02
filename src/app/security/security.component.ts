import {Component, OnInit} from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import {Route, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {PasswordErrorStateMatcher} from './password-error-state-matcher';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass']
})
export class SecurityComponent{

  logForm: FormGroup;
  signForm: FormGroup;

  matcher = new PasswordErrorStateMatcher();

  token: any;

  constructor(private service: JwtClientService, private router: Router, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.logForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
      ]],
    });

    this.signForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
      ]],
      passwordConfirmation: ['', [
        Validators.required,
        Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    }, {validators: this.checkPasswords });
  }

  public checkPasswords(group: FormGroup): null | { notSame: boolean }{ // here we have the 'passwords' group

    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;

    return password === passwordConfirmation ? null : { notSame: true };
  }

  public signUp(): void {
    this.subscribeAndAuth(this.service.postSignUp(JSON.stringify(this.signForm.value)));
  }

  public logIn(): void {
    this.subscribeAndAuth(this.service.postLogIn(JSON.stringify(this.logForm.value)));
  }

  public subscribeAndAuth(resp: Observable<any>): void {
    resp.subscribe(
      data => {
        this.token = data;
        this.snackBar.open('Authenticated', 'Close', {duration: 4000});
        localStorage.setItem('jwt-rpmanager', JSON.stringify({ token: this.token }));
        this.router.navigate(['/']);
      },
      err => {
        this.snackBar.open(JSON.parse(err.error).message, 'Close', {duration: 4000});
      }
    );
  }

  get logUsername(): AbstractControl | null {
    return this.logForm.get('username');
  }

  get logPassword(): AbstractControl | null {
    return this.logForm.get('password');
  }


  get signUsername(): AbstractControl | null {
    return this.signForm.get('username');
  }
  get signPassword(): AbstractControl | null {
    return this.signForm.get('password');
  }
  get signPasswordConfirmation(): AbstractControl | null {
    return this.signForm.get('passwordConfirmation');
  }
  get signEmail(): AbstractControl | null {
    return this.signForm.get('email');
  }

}


