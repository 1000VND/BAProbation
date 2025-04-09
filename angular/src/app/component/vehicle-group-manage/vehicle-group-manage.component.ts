import { Component, OnInit } from '@angular/core';
import { VehicleGroupService } from '../../services/vehicle-group.service';
import { UserDto } from '../../models/user';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'vehicle-group-manage',
  templateUrl: './vehicle-group-manage.component.html',
  styleUrls: ['./vehicle-group-manage.component.scss']
})
export class VehicleGroupManageComponent implements OnInit {

  searchUser: string = '';
  users: UserDto[] = [];
  filterUser: UserDto[] = [];
  isUserEmpty: boolean = false;
  selectedFiles!: TreeNode[];

  vehicleGroups: { PK_VehicleGroupID: number, ParentVehicleGroupID: number, Name: string }[] = [
    { PK_VehicleGroupID: 73311, ParentVehicleGroupID: 0, Name: '29C42225' },
    { PK_VehicleGroupID: 73619, ParentVehicleGroupID: 73311, Name: '29K07730_C' },
    { PK_VehicleGroupID: 73906, ParentVehicleGroupID: 73311, Name: 'xexinphuhieu' },
    { PK_VehicleGroupID: 74966, ParentVehicleGroupID: 73906, Name: 'tkgiamsat' },
    { PK_VehicleGroupID: 75744, ParentVehicleGroupID: 75744, Name: '29H16823' },
    { PK_VehicleGroupID: 76355, ParentVehicleGroupID: 0, Name: '29E09055' }
  ];

  files: TreeNode[] = [];

  constructor(
    private vehicleGroupService: VehicleGroupService,
  ) { }

  ngOnInit() {
    this.isUserEmpty = false;
    this.getUser();
    this.files = this.buildTree(this.vehicleGroups);
  }

  buildTree(groups: { PK_VehicleGroupID: number, ParentVehicleGroupID: number, Name: string }[]): TreeNode[] {
    // Tạo một đối tượng map để lưu trữ các nhóm theo PK_VehicleGroupID
    const groupMap: { [key: number]: TreeNode } = {};

    const tree: TreeNode[] = [];

    // Duyệt qua tất cả các nhóm phương tiện và khởi tạo một TreeNode cho mỗi nhóm
    groups.forEach(group => {
      groupMap[group.PK_VehicleGroupID] = {
        label: group.Name,
        data: `${group.Name} Data`,
        icon: 'pi pi-fw pi-folder',
        children: []
      };
    });

    // Duyệt qua tất cả các nhóm phương tiện lần nữa để xây dựng cấu trúc cây
    groups.forEach(group => {
      // Nếu nhóm là node gốc (ParentVehicleGroupID = 0), thêm vào mảng cây
      if (group.ParentVehicleGroupID === 0) {
        tree.push(groupMap[group.PK_VehicleGroupID]);
      } else {
        // Nếu nhóm có cha, tìm parent node trong groupMap
        const parent = groupMap[group.ParentVehicleGroupID];
        if (parent) {
          // Thêm node con vào children của node cha
          parent.children!.push(groupMap[group.PK_VehicleGroupID]);
        }
      }
    });

    // Trả về kết quả cây phân cấp
    return tree;
  }

  getUser() {
    this.vehicleGroupService.getUsers().subscribe(user => {
      this.users = [...user];
      this.filterUser = [...user];

      this.isUserEmpty = this.filterUser.length === 0 ? true : false;
    })
  }

  onSearchChange() {
    if (this.searchUser.trim() === '') {
      this.filterUser = [...this.users];
      return;
    }

    this.filterUser = this.users.filter(result =>
      result.fullname.toLowerCase().includes(this.searchUser.toLowerCase()) ||
      result.username.toLowerCase().includes(this.searchUser.toLowerCase())
    );

    this.isUserEmpty = this.filterUser.length === 0 ? true : false;
  }

  onOptionSelected(event: any) {
    console.log(event);
  }
}
