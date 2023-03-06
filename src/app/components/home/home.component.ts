import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

arrUser: Profile[] = [];
currentPage: number = 1;
totalPages: number = 1;

constructor(private usersService: UsersService){}

async ngOnInit(): Promise<void> {
  try{
    let response = await this.usersService.getAll()
  this.arrUser = response.results
  console.log(this.arrUser);
  }
  catch {

  }
  
}

async gotoPage(pNum: number = 1): Promise<void> {
  try {
    let response = await this.usersService.getAll(pNum)
    console.log(response);
    this.currentPage = response.page;
    this.totalPages = response.total_pages;
    this.arrUser = response.results;
    //console.log(this.arrUser)
  }
  catch (error) {
    console.log(error);
  }
}

}
