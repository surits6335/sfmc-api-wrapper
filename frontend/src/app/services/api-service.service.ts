import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    
  };
  isLoading: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({ 
      'Accept':  'application/xml'
    })
  };

  constructor(
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  addUsers(userModel: UserModel)
  {
    this.isLoading = true;
    this._httpClient.post('/api/addUser', userModel, {...this.httpOptions, responseType: 'text'})
    .pipe(
      map(response => {
        response = JSON.stringify(response);
        return response;
      })
    )
    .subscribe(
      {
        next: (v) => {
          this._snackBar.open('User created successfully', undefined, {...this.snackBarConfig, panelClass: 'success-snackbar'});
          this.isLoading = false;
        },
        error: (e) => {
          this._snackBar.open('Error in user creation', undefined, {...this.snackBarConfig, panelClass: 'error-snackbar'});
          this.isLoading = false;
        },
        complete: () => console.info('complete')
    })
  }
}
