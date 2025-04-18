import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MeidaVehicleService } from '../../services/media-vehicle.service';
import { PictureParams, PictureVehicle } from '../../models/vehicle-group';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ComboboxDto, GetDataTreeDto, Pagination } from '../../models/common';

@Component({
  selector: 'media-photo',
  templateUrl: './media-photo.component.html',
  styleUrls: ['./media-photo.component.scss']
})
export class MediaPhotoComponent implements OnInit {
  dataTree: GetDataTreeDto[] = [];
  vehicles: { label: string; value: string; customerId: number }[] = [];
  selectedVehiclePlate: string = '';
  channels: ComboboxDto[] = [];
  sortPhotos: ComboboxDto[] = [
    {
      label: 'Theo ảnh mới nhất',
      value: 1
    },
    {
      label: 'Theo ảnh cũ nhất',
      value: 2
    }
  ];
  poolAddress: string[] = [
    'Bãi đỗ 49 đức giang',
    'Điểm kẹp chì - KV3',
    'Bãi đổ 33 Lý Thường Kiệt',
    'Bãi đổ Yết Kiêu: Công ty 901',
    'Bãi đổ 29 Liễu Giai, Ba Đình',
    'Bãi đổ gầm cầu vượt Ngã Tư Sở',
    'Bãi đổ trước cổng Hacinco',
    'Bãi đổ tại tòa nhà Syrena',
    'Bãi đổ xe ô tô nằm tại gầm Cầu Chương Dương',
    'Bãi đổ xe ô tô tại 2VJ6+C6F, Chương Dương Độ, Hoàn Kiếm'
  ]
  emptyMessage = 'Không có dữ liệu';
  date: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();
  timeFrom: Date = new Date(new Date().setHours(0, 0, 0, 0));
  timeTo: Date = new Date(new Date().setHours(23, 59, 59, 59));
  selectedGroup: number[] = [];
  selectedVehicle: string | undefined;
  selectedChannels: number[] | undefined;
  selectAllChannels: boolean = false;
  selectedSortPhoto: number = 1;
  numberPictureDisplay: number = 6;
  pagination: Pagination = { currentPage: 1, itemsPerPage: 50, totalItems: 0, totalPages: 0 };
  pictures: PictureVehicle[] = [];

  constructor(
    private _mediaVehicleService: MeidaVehicleService,
    private _loadingService: NgxSpinnerService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.minDate.setDate(this.minDate.getDate() - 30);
    this.maxDate.setDate(this.maxDate.getDate());
    this.getGroups();
    this.getVehicleGroupById([0]);
  }

  /**
   * Lấy danh sách nhóm xe
   */
  getGroups() {
    this._loadingService.show();
    this._mediaVehicleService.getGroups().pipe(finalize(() => {
      this._loadingService.hide();
    })).subscribe({
      next: (res) => {
        this.dataTree = res.map(item => ({
          id: item.pK_VehicleGroupID,
          parentId: item.parentVehicleGroupID,
          label: `${item.name} (${item.countVehicle} xe)`,
          key: item.pK_VehicleGroupID.toString(),
          countChildren: item.countVehicle
        }));
      }, error: () => {
        this._toastr.error('Có lỗi xảy ra khi tải dữ liệu nhóm phương tiện');
      }
    });
  }

  /**
   * Tìm kiếm xe theo id của nhóm xe
   * @param groupId Id nhóm xe
   */
  getVehicleGroupById(groupId: number[]) {
    const body = this.dataTree.length == groupId.length ? [0] : groupId;

    this._loadingService.show();
    this._mediaVehicleService.getVehicleGroupById(body).pipe(finalize(() => {
      this._loadingService.hide();
    })).subscribe({
      next: (res) => {
        this.vehicles = res.map(item => {
          return {
            label: item.plateAndCode,
            value: item.vehiclePlate,
            customerId: item.xnCode
          }
        });
      }, error: () => {
        this._toastr.error('Có lỗi xảy ra khi tải dữ liệu xe');
      }
    });
  }

  /**
   * Khi chọn nhóm xe thì sẽ random lại kênh
   * @param param 
   */
  onChangeVehicle(param: { value: string }) {
    this.selectedChannels = [];
    this.selectAllChannels = false;
    this.selectedVehiclePlate = this.vehicles.find(e => e.value == param.value)?.label ?? '';

    const channels = [
      { label: 'Kênh 1', value: 1 },
      { label: 'Kênh 2', value: 2 },
      { label: 'Kênh 3', value: 3 },
      { label: 'Kênh 4', value: 4 }
    ];

    // Random lại kênh trong mảng channels
    this.channels = this.getRandomChannels(channels);
  }

  /**
   * Kiểm tra nếu timeFrom lớn hơn timeTo
   */
  validateTimes() {
    if (this.timeFrom && this.timeTo) {
      const fromTime = this.timeFrom.getHours() * 60 + this.timeFrom.getMinutes();
      const toTime = this.timeTo.getHours() * 60 + this.timeTo.getMinutes();

      if (fromTime > toTime) {
        this._toastr.error('Thời gian bắt đầu không được lớn hơn thời gian kết thúc');
        this.timeFrom = new Date(new Date().setHours(0, 0, 0, 0));
        this.timeTo = new Date(new Date().setHours(23, 59, 59, 59));
      }
    }
  }

  /**
   * Kiểm tra dữ liệu đầu vào trước khi tìm kiếm
   * @returns  
   */
  validateDataSearch() {
    if (!this.selectedVehicle) {
      this._toastr.error('Vui lòng chọn xe');
      return false;
    } else if (!this.date) {
      this._toastr.error('Vui lòng chọn ngày');
      return false;
    } else if (!this.timeFrom || !this.timeTo) {
      this._toastr.error('Vui lòng chọn khoảng thời gian');
      return false;
    }

    return true;
  }

  /**
   * Tìm kiếm ảnh
   */
  search() {
    if (!this.validateDataSearch()) {
      return;
    }

    const customerId = this.vehicles.find(e => e.value == this.selectedVehicle)?.customerId ?? 0;
    const channels = this.selectAllChannels ? this.channels.map(item => item.value) : this.selectedChannels;
    const startTime = new Date(this.date.setHours(this.timeFrom.getHours(), this.timeFrom.getMinutes(), 0, 0));
    const endTime = new Date(this.date.setHours(this.timeTo.getHours(), this.timeTo.getMinutes(), 59, 59));

    const body: PictureParams = {
      customerId: customerId,
      vehicleName: this.selectedVehicle ? this.selectedVehicle.toString() : '',
      channels: channels ?? [],
      startTime: startTime,
      endTime: endTime,
      orderBy: this.selectedSortPhoto,
      pageNumber: this.pagination.currentPage,
      pageSize: this.pagination.itemsPerPage
    };

    this._loadingService.show();

    this._mediaVehicleService.getPictureByVehiclePlate(body).pipe(finalize(() => {
      this._loadingService.hide();
    })).subscribe({
      next: (res) => {
        this.pictures = res.result ?? [];

        this.pictures.forEach(item => {
          const randomIndex = Math.floor(Math.random() * this.poolAddress.length);

          item.address = this.poolAddress[randomIndex];
        });

        this.pagination = res.pagination ?? { currentPage: 1, itemsPerPage: 50, totalItems: 0, totalPages: 0 };
      }, error: () => {
        this._toastr.error('Có lỗi xảy ra khi tải dữ liệu ảnh');
      }
    })
  }

  /**
   * Hiển thị số ảnh theo lựa chọn
   * @param numberPicture Số ảnh lựa chọn hiển thị
   */
  displayImage(numberPicture: number) {
    this.numberPictureDisplay = numberPicture;
  }

  /**
   * Hàm bắt sự kiện thay đổi giá trị của combobox kênh
   * @param event Các giá trị được chọn trong combobox
   */
  onChangeValueChannel(event: number[]) {
    // this.selectedChannels = event;
    this.selectAllChannels = event && event.length == 1 && event[0] == 0;
  }

  /**
   * Hàm bắt sự kiện thay đổi giá trị của pagination
   * @param pagination 
   */
  onPageChange(pagination: Pagination) {
    this.pagination = pagination;
    this.search();
  }

  /**
   * Random kênh trong mảng channels
   * @param channels Danh sách kênh
   * @returns random channels 
   */
  private getRandomChannels(channels: ComboboxDto[]): ComboboxDto[] {
    const minChannels = 1;
    const maxChannels = 4;
    const numberOfChannels = Math.floor(Math.random() * (maxChannels - minChannels + 1)) + minChannels;

    // Shuffle the channels array and return the first `numberOfChannels` items
    const shuffledChannels = [...channels].sort(() => Math.random() - 0.5);
    return shuffledChannels.slice(0, numberOfChannels).sort((a, b) => a.value - b.value);
  }
}
