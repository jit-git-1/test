import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public id:any;
  public res:any;
  public user_data:any;

  constructor(public http:HttpClient,
              public activatedRoute:ActivatedRoute,
              public router:Router,
              private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
      this.SpinnerService.show();
      this.id = params['id'];
      this.http.get(environment.api+ 'users/'+this.id).subscribe((response) => {
      this.res = response;
      this.user_data = this.res.data;
      console.log(this.user_data);
      this.SpinnerService.hide();
    });
  });
  }
  back(){
    this.router.navigate(['']);
  }

}
