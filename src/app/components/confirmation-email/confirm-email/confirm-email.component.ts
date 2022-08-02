import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HiddenData } from 'src/app/models/hidden-data';
import { User } from 'src/app/models/user';
import { HiddenDataService } from 'src/app/services/hidden-data.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,private hiddenDataService: HiddenDataService) { }

  hiddenData : HiddenData;


  ngOnInit(): void {    
    if(this.hiddenDataService.getData() == null)
    {
      this.redirectToLogin();
    }else
    {
      this.hiddenData = this.hiddenDataService.getData();
    }
  }

  ngOnDestroy()
  {    
   this.hiddenDataService.clearData();
  }

  redirectToLogin()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login';    
    this.router.navigateByUrl(redirect);
  }

}

