export interface GetAllVehicleGroupDto {
    pK_VehicleGroupID: number;
    parentVehicleGroupID: number;
    name: string;
}

export interface VehicleGroupDto {
    notInGroup: GetAllVehicleGroupDto[];
    inGroup: GetAllVehicleGroupDto[];
}

export interface GetDataTreeDto {
    id: number;
    parentId: number;
    label: string;
}
