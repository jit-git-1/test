import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner"; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public res: any;
  public user_data: any =[];
  public optionSelect:any;
  public sortOption:any;

  constructor(public http: HttpClient,  
              public router: Router,
              private SpinnerService: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.get_data();
  }

  get_data(){
    this.SpinnerService.show();
    this.http.get(environment.api+ 'users?delay=3').subscribe((response) => {
      this.res = response;
      this.user_data = this.res.data;
      // console.log(this.user_data);
      this.SpinnerService.hide(); 
    });
  }

  onOptionsSelectedSort(event:any){
    if (event !== '') {                                     // * selected value from dropdown and set into a variable.
      this.optionSelect = event.target.value;
      if (this.optionSelect === 'none') {
        let data = this.user_data.sort((a:any, b: any) => a.id - b.id);
        this.user_data = data
        this.toastr.success("User show by id");

      } else if (this.optionSelect === 'first_name') {
        let data = this.user_data.sort((a:any, b: any) => a.first_name.localeCompare(b.first_name));        
        this.user_data = data
        this.toastr.success("User show by first name");

      } else if (this.optionSelect === 'last_name') {
        let data = this.user_data.sort((a:any, b: any) => a.last_name.localeCompare(b.last_name));
        this.user_data = data
        this.toastr.success("User show by last name");
      }
    
    } else {
      this.toastr.error("Please Select one option");      
    }
  } 


  user_details(id: any) {
    this.router.navigate(['user_details/' + id]);
  }
  

}
