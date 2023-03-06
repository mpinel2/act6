import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent {
  @Input() usuario: Profile | any;

  constructor(
    private userService: UsersService
  ){}

  async deleteUser(pId : string | undefined): Promise<any> {
    if(pId !== undefined){
      let response = await this.userService.delete(pId);
      console.log(response);
    }
    
  }



}
