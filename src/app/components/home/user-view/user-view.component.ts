import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  usuario: Profile | any;

  constructor(
    private userServices: UsersService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any)=>{
      let _id: string | any = params.userid;
      console.log(typeof _id);
      let response: any = await this.userServices.getById(_id);
      this.usuario = response.results;
      console.log(this.usuario);
    } )}
   
  async deleteUser(pId : string): Promise<void> {
      if(pId !== undefined){
        let response = await this.userServices.delete(pId);
        console.log(response);
      }
      
    }

  }

