import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  title: string = 'Registrar'
  userForm: FormGroup;
  

  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute){

    this.userForm = new FormGroup({
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      username: new FormControl("", []),
      email: new FormControl("", []),
      image: new FormControl("", []),

    }, [])
  }

  ngOnInit():void {
    this.activatedRoute.params.subscribe(async (params:any)=> {
      let _id = params.userid 
      if(_id) {
        this.title = 'Actualizar'
        const response = await this.userService.getById(_id);
        const User: Profile = response.results;
        //console.log(response.results);

        this.userForm = new FormGroup({
          _id: new FormControl (_id, []),
          first_name: new FormControl( User?.first_name, []),
          last_name: new FormControl(User?.last_name, []),
          username: new FormControl(User?.username, []),
          email: new FormControl(User?.email, []),
          image: new FormControl(User?.image, []),
    
        }, [])

      }
    })
  }

async getDataForm(){
  let User = this.userForm.value
  if(User._id){
    let response = await this.userService.update(User);
    console.log(response);

  } else {
    try {
      let response = await this.userService.create(User);
      console.log(response);
      if(response._id){
        alert('El usuario se ha creado correctamente');
      }
    }
    catch {
    }

  }
  
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.userForm.get(pControlName)?.hasError(pError) && this.userForm.get(pControlName)?.touched) {
      return true
    }
    return false
  }
}
