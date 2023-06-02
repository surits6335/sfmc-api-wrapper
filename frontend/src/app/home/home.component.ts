import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/user-model';
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form!: FormGroup;
  userData: UserModel = new UserModel();

  
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        userID: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        password: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        notificationEmailAddress: new FormControl(null, [Validators.required, Validators.email]),
        isActive: new FormControl(false),
        isAPIUser: new FormControl(false),
        isLocked: new FormControl(false),
        mustChangePassword: new FormControl(false),
        defaultBusinessUnit: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"),]),
        roleObjectID: new FormControl(null, [Validators.required])
      }
    )
  }

  getErrorMessage(formControlName: string) {
    let formControl: AbstractControl<any, any> | null = this.form.get(formControlName);

    if (formControl !== null)
    {
      if (formControl.hasError('required')) {
        return 'You must enter a value';
      }
      else if (formControl.hasError('minlength')) {
        return 'UserID should not be less than 8 characters';
      }
      else if (formControl.hasError('email')) {
        return 'Enter a valid email address';
      }
      else if (formControl.hasError('pattern')) {
        return 'Enter a valid numeric value';
      }
    }
    
    return '';
  }

  onSubmit(): void
  {
    console.log(this.form);
    this.userData.UserID = this.form.value?.userID;
    this.userData.Password = this.form.value?.password;
    this.userData.Name = this.form.value?.name;
    this.userData.Email = this.form.value?.email;
    this.userData.NotificationEmailAddress = this.form.value?.notificationEmailAddress;
    this.userData.ActiveFlag = this.form.value?.isActive;
    this.userData.IsAPIUser = this.form.value?.isAPIUser;
    this.userData.IsLocked = this.form.value?.isLocked;
    this.userData.MustChangePassword = this.form.value?.mustChangePassword;
    this.userData.DefaultBusinessUnit = this.form.value?.defaultBusinessUnit;
    this.userData.RoleObjectID = this.form.value?.roleObjectID;

    this.apiService.addUsers(this.userData);
  }
}
