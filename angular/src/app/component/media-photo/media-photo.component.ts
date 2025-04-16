import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MeidaVehicleService } from '../../services/media-vehicle.service';
import { PictureParams, PictureVehicle } from '../../models/vehicle-group';
import { TreeNode } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ComboboxDto, GetDataTreeDto, Pagination, PaginationParams } from '../../models/common';

@Component({
  selector: 'media-photo',
  templateUrl: './media-photo.component.html',
  styleUrls: ['./media-photo.component.scss']
})
export class MediaPhotoComponent implements OnInit {
  nodeGroups: TreeNode[] = [];
  vehicles: { label: string, value: string }[] = [];
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
  emptyMessage = 'Không có dữ liệu';
  date: Date = new Date();
  minDate: Date = new Date();
  timeFrom: Date = new Date(new Date().setHours(0, 0, 0, 0));
  timeTo: Date = new Date(new Date().setHours(23, 59, 0, 0));
  selectedGroup: TreeNode[] = [];
  selectedVehicle: string | undefined;
  selectedChannels: number[] | undefined;
  selectAllChannels: boolean = false;
  selectedSortPhoto: number = 1;
  numberPictureDisplay: number = 6;
  pagination: Pagination = { currentPage: 1, itemsPerPage: 50, totalItems: 0, totalPages: 0 };
  paginationParams: PaginationParams | undefined;
  pictures: PictureVehicle[] = [];

  constructor(
    private _mediaVehicleService: MeidaVehicleService,
    private _loadingService: NgxSpinnerService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.minDate.setDate(this.minDate.getDate() - 30);
    this.getGroups();
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
        const totalVehicle = res.reduce((acc, item) => acc + item.countVehicle, 0);

        const dataInGroup: GetDataTreeDto[] = res.map(item => ({
          id: item.pK_VehicleGroupID,
          parentId: item.parentVehicleGroupID,
          label: `${item.name} (${item.countVehicle} xe)`,
          key: item.pK_VehicleGroupID.toString(),
        }));

        const data = this.buildTree(dataInGroup);

        this.nodeGroups = [{
          label: `Tất cả (${totalVehicle} xe)`,
          data: 0,
          key: '0',
          children: data,
          selectable: true,
          expanded: true,
        }];
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
    this._loadingService.show();
    this._mediaVehicleService.getVehicleGroupById(groupId).pipe(finalize(() => {
      this._loadingService.hide();
    })).subscribe((res) => {
      this.vehicles = res.map(item => {
        return {
          label: item.plateAndCode,
          value: item.vehiclePlate
        }
      });
    });
  }

  /**
   * Khi chọn nhóm xe thì sẽ gọi api lấy danh sách xe
   * @param param 
   * @param action 
   */
  onNodeSelect(param: { node: TreeNode }, action: string) {
    // Trường hợp node là gốc
    if (param.node.data == 0 && action == 'select') {
      this.getVehicleGroupById([0])
    } else if (param.node.data == 0 && action == 'unselect') {
      this.getVehicleGroupById([]);
    } else {
      const groupId = this.selectedGroup.map(item => item.data);

      this.getVehicleGroupById(groupId)
    }
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
        this.timeTo = new Date(new Date().setHours(23, 59, 0, 0));
      }
    }
  }

  validateDataSearch() {
    if (!this.selectedVehicle) {
      this._toastr.error('Vui lòng chọn xe');
      return false;
    } else if (this.selectedChannels?.length == 0) {
      this._toastr.error('Vui lòng chọn kênh');
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
    const channels = this.selectAllChannels ? this.channels.map(item => item.value) : this.selectedChannels;

    const body: PictureParams = {
      vehicleName: this.selectedVehicle ? this.selectedVehicle.toString() : '',
      channels: channels ?? [],
      startTime: new Date(this.date.setHours(this.timeFrom.getHours(), this.timeFrom.getMinutes(), 0, 0)),
      endTime: new Date(this.date.setHours(this.timeTo.getHours(), this.timeTo.getMinutes(), 59, 59)),
      orderBy: this.selectedSortPhoto,
      pageNumber: this.paginationParams ? this.paginationParams.pageNumber : this.pagination.currentPage,
      pageSize: this.paginationParams ? this.paginationParams.pageSize : this.pagination.itemsPerPage
    };

    this._loadingService.show();
    this._mediaVehicleService.getPictureByVehiclePlate(body).pipe(finalize(() => {
      this._loadingService.hide();
    })).subscribe(res => {
      this.pictures = res.result ?? [];
      this.pagination = res.pagination ?? { currentPage: 1, itemsPerPage: 50, totalItems: 0, totalPages: 0 };
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
    this.selectAllChannels = event && event.length == 1 && event[0] == 0;
  }

  onPageChange(pagination: Pagination) {
    this.pagination = pagination;
    this.search();
  }

  /**
   * Random kênh trong mảng channels
   * @param channels Danh sách kênh
   * @returns random channels 
   */
  private getRandomChannels(channels: { label: string; value: number }[]): { label: string; value: number }[] {
    const minChannels = 1;
    const maxChannels = 4;
    const numberOfChannels = Math.floor(Math.random() * (maxChannels - minChannels + 1)) + minChannels;

    // Shuffle the channels array and return the first `numberOfChannels` items
    const shuffledChannels = [...channels].sort(() => Math.random() - 0.5);
    return shuffledChannels.slice(0, numberOfChannels).sort((a, b) => a.value - b.value);
  }

  /**
   * Chuyển đổi danh sách các nhóm thành cấu trúc cây
   * @param groups Danh sách các nhóm phương tiện
   * @returns Cấu trúc cây các nhóm phương tiện 
   */
  private buildTree(groups: GetDataTreeDto[]): TreeNode[] {
    // Tạo một đối tượng map để lưu trữ các nhóm theo PK_VehicleGroupID
    const groupMap: { [key: number]: TreeNode } = {};

    const tree: TreeNode[] = [];

    // Duyệt qua tất cả các nhóm phương tiện và khởi tạo một TreeNode cho mỗi nhóm
    groups.forEach(group => {
      groupMap[group.id] = {
        label: group.label,
        data: group.id,
        icon: 'pi pi-fw pi-folder',
        children: [],
        key: group.key,
      };
    });

    // Duyệt qua tất cả các nhóm phương tiện lần nữa để xây dựng cấu trúc cây
    groups.forEach(group => {
      // Nếu nhóm là node gốc (ParentVehicleGroupID = 0), thêm vào mảng cây
      if (group.parentId === 0) {
        tree.push(groupMap[group.id]);
      } else {
        // Nếu nhóm có cha, tìm parent node trong groupMap
        const parent = groupMap[group.parentId];
        if (parent) {
          // Thêm node con vào children của node cha
          parent.children!.push(groupMap[group.id]);
        }
      }
    });

    // Cập nhật label cho các node có con
    // Object.values(groupMap).forEach(node => {
    //   if (node.children && node.children.length > 0) {
    //     node.label = `${node.label} (${node.children.length} xe)`;
    //   }
    // });

    // Trả về kết quả cây phân cấp
    return tree;
  }
}
