import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service'
import { AuthService } from './auth.service'
import { IUser } from './user.model'

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
    .error input { background-color:#E3C3C5; }
    .error ::-webkit-input-placeholder { color:#808080; }
    .error ::-moz-placeholder { color:#808080; }
    .error :-moz-placeholder { color:#808080; }
    .error ::ms-input-placeholder { color:#808080; }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  private firstName:FormControl
  private lastName:FormControl

  constructor(private authService:AuthService, 
    private router: Router, private route:ActivatedRoute,
    @Inject(TOASTR_TOKEN) private toastr:Toastr) {

  }

  ngOnInit() {
    let curUser: IUser
    this.route.data.forEach((data) => {
      curUser = <IUser>data['currentUser']
    })

    this.firstName = new FormControl(curUser.firstName, [Validators.required, Validators.pattern('^[a-zA-Z].*')])
    this.lastName = new FormControl(curUser.lastName, Validators.required)
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues) {
    if(this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
      .subscribe(() => {
        this.toastr.success('Profile Saved')
      })
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched
  }

  cancel() {
    this.router.navigate(['events'])
  }

}