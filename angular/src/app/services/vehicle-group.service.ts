import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/user';
import { VehicleGroupDto } from '../models/vehicle-group';

@Injectable({
  providedIn: 'root'
})
export class VehicleGroupService {
  baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getUsers() {
    return this._http.get<UserDto[]>(this.baseUrl + 'VehicleGroupManage/GetAllUser');
  }

  getUserVehicleGroup(userId: string) {
    return this._http.post<VehicleGroupDto>(`${this.baseUrl}VehicleGroupManage/GetUserVehicleGroup?userId=${userId}`, {});
  }
}
