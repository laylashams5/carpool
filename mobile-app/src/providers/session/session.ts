import { Injectable } from '@angular/core';
import { HA_Storage } from '../storage/storage';

export interface IUser
{
  id:number,
  typeid:number,
  image?:string,
  mobile:string,
  carmodel:string,
  address?:string,
  username?:string,
  email?:string,
  points?:number,
}

@Injectable()
export class HA_Session {

  
  public user:IUser = null;


  constructor(
    private storage:HA_Storage,
) {
    this.checkSavedSession();
  }

  private checkSavedSession()
  {
    this.user = this.storage.get('HA_USER');
  }


  public setUser(user:IUser)
  {
    this.user = user;
    this.storage.set('HA_USER',user);
  }

  public isGuest():boolean
  {
    return !this.user;
  }

  public getUser():IUser
  {
    return this.user;
  }

  public clear()
  {
    this.user = null;
    return this.storage.remove('HA_USER');
  }

}
