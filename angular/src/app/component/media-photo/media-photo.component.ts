import { finalize, from, map } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MeidaVehicleService } from '../../services/media-vehicle.service';
import { ComboboxDto, GetDataTreeDto, VehicleGroupDto } from '../../models/vehicle-group';
import { TreeNode } from 'primeng/api';
import { TreeSelect } from 'primeng/treeselect';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'media-photo',
  templateUrl: './media-photo.component.html',
  styleUrls: ['./media-photo.component.scss']
})
export class MediaPhotoComponent implements OnInit {
  @ViewChild('treeSelect') treeSelect!: TreeSelect;

  nodeGroups: TreeNode[] = [];
  vehicles: ComboboxDto[] = [];
  emptyMessage = 'Không có dữ liệu';
  minWidth = { 'min-width': '15vw', 'width': '100%' };

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

  selectedGroup: TreeNode[] = [];
  selectedVehicle: number | undefined;
  selectedChannels: number | undefined;
  selectedSortPhoto: number = 1;
  channels: ComboboxDto[] = [];
  date: Date = new Date();
  timeFrom: Date = new Date(new Date().setHours(0, 0, 0, 0));
  timeTo: Date = new Date(new Date().setHours(23, 59, 0, 0));

  constructor(
    private _mediaVehicleService: MeidaVehicleService,
    private _loadingService: NgxSpinnerService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getGroups();
  }

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
        this._toastr.error('Có lỗi xảy ra khi tải dữ liệu nhóm xe');
      }
    });
  }

  getVehicleGroupById(groupId: number[]) {
    this._loadingService.show();
    this._mediaVehicleService.getVehicleGroupById(groupId).pipe(finalize(() => {
      this._loadingService.hide();
    })).subscribe((res) => {
      this.vehicles = res.map(item => {
        return {
          label: item.plateAndCode,
          value: item.pK_VehicleID
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
  onChangeVehicle(param: { value: VehicleGroupDto }) {
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

  search(){
    
  }

  /**
   * Random kênh trong mảng channels
   * @param channels 
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
   * @param groups 
   * @returns tree 
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
