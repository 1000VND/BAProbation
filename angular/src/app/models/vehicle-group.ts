export interface GetAllVehicleGroupDto {
    pK_VehicleGroupID: number;
    parentVehicleGroupID: number;
    name: string;
    countVehicle: number;
}

export interface GetDataTreeDto {
    id: number;
    parentId: number;
    label: string;
    key: string;
}

export interface VehicleGroupDto {
    pK_VehicleID: number;
    plateAndCode: string;
}

export interface ComboboxDto {
    label: string;
    value: number;
}
