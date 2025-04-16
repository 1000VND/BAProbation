import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetAllVehicleGroupDto, PictureParams, PictureVehicle, VehicleDto } from '../models/vehicle-group';
import { paginatedResultPost } from './pagination-helper';

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
    return this._http.post<VehicleDto[]>(this.baseUrl + 'MediaVehicle/GetVehicles', listId);
  }

  getPictureByVehiclePlate(param: PictureParams) {
    return paginatedResultPost<PictureVehicle[]>(this.baseUrl + 'MediaVehicle/GetPictures', param, this._http);
  }
}
