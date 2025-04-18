export interface GetAllVehicleGroupDto {
    pK_VehicleGroupID: number;
    parentVehicleGroupID: number;
    name: string;
    countVehicle: number;
}

export interface VehicleDto {
    vehiclePlate: string;
    plateAndCode: string;
    xnCode: number;
}

export interface PictureVehicle {
    photoUrl: string;
    timePicture: Date;
    vehiclePlate: string;
    vehicleSpeed: number;
    vehicleChannel: number;
    driverName: string;
    address: string;
}

export interface PictureParams {
    customerId: number;
    vehicleName: string;
    channels: number[];
    startTime: Date;
    endTime: Date;
    orderBy: number;
    pageNumber: number;
    pageSize: number;
}

export interface PictureCard {
    item: PictureVehicle;
    index: number;
    list: PictureVehicle[];
    currentPage: number;
}