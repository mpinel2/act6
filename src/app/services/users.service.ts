import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

private baseUrl: string = 'https://peticiones.online/api/users'
  constructor(private httpClient: HttpClient) { }


  getAll(pPage: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${pPage}`))

  }

  getById(pId :string) : Promise <any> {
    return lastValueFrom( this.httpClient.get<any>(`${this.baseUrl}/${pId}`))
  }

  create(pUser : Profile): Promise <Profile>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, pUser))
  }

  update(pUser : Profile): Promise <Profile> {
    return lastValueFrom(this.httpClient.put<Profile>((`${this.baseUrl}/${pUser._id}`), pUser))
  }

  delete(pId :  string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${pId}`))
  }

}
