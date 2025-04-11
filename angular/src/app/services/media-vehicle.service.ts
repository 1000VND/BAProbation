import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetAllVehicleGroupDto, VehicleGroupDto } from '../models/vehicle-group';

@Injectable({
  providedIn: 'root'
})
export class MeidaVehicleService {
  baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getGroups() {
    return this._http.get<GetAllVehicleGroupDto[]>(this.baseUrl + 'MediaVehicle/GetAllGroups');
  }

  getVehicleGroupById(listId: number[]) {
    return this._http.post<VehicleGroupDto[]>(this.baseUrl + 'MediaVehicle/GetVehicles', listId);
  }
}
