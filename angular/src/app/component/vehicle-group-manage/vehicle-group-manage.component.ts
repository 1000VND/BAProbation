import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VehicleGroupService } from '../../services/vehicle-group.service';
import { UserDto } from '../../models/user';
import { TreeNode } from 'primeng/api';
import { GetDataTreeDto, VehicleGroupDto } from '../../models/vehicle-group';

@Component({
  selector: 'vehicle-group-manage',
  templateUrl: './vehicle-group-manage.component.html',
  styleUrls: ['./vehicle-group-manage.component.scss']
})
export class VehicleGroupManageComponent implements OnInit {

  searchUser: string = '';
  searchVehicleGroup: string = '';
  searchUserVehicleGroup: string = '';
  users: UserDto[] = [];
  filterUser: UserDto[] = [];
  filterVehicleGroup: TreeNode[] = [];
  filterUserVehicleGroup: TreeNode[] = [];
  isUserEmpty: boolean = false;
  isVehicleGroupEmpty: boolean = false;
  isUserVehicleGroupEmpty: boolean = false;
  selectedVehicleGroupFiles!: TreeNode[];
  selectedUserVehicleGroupFiles!: TreeNode[];
  selectUserId: string = '';

  vehicleGroups: VehicleGroupDto = {
    notInGroup: [],
    inGroup: []
  };

  treeNotInGroup: TreeNode[] = [];
  treeInGroup: TreeNode[] = [];

  constructor(
    private vehicleGroupService: VehicleGroupService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getUser();

    this.isVehicleGroupEmpty = true;
    this.isUserVehicleGroupEmpty = true;
  }

  getUser() {
    this.vehicleGroupService.getUsers().subscribe(user => {
      this.users = [...user];
      this.filterUser = [...user];

      this.isUserEmpty = this.filterUser.length === 0 ? true : false;
    })
  }

  getVehicleGroup() {
    this.vehicleGroupService.getUserVehicleGroup(this.selectUserId).subscribe(vehicleGroup => {
      this.vehicleGroups = vehicleGroup;
      const dataNotInGroup: GetDataTreeDto[] = vehicleGroup.notInGroup.map(item => ({
        id: item.pK_VehicleGroupID,
        parentId: item.parentVehicleGroupID,
        label: item.name
      }));

      const dataInGroup: GetDataTreeDto[] = vehicleGroup.inGroup.map(item => ({
        id: item.pK_VehicleGroupID,
        parentId: item.parentVehicleGroupID,
        label: item.name
      }));

      this.treeNotInGroup = [...this.buildTree(dataNotInGroup)];
      this.treeInGroup = [...this.buildTree(dataInGroup)];

      this.filterVehicleGroup = [...this.treeNotInGroup];
      this.filterUserVehicleGroup = [...this.treeInGroup];

      this.isVehicleGroupEmpty = this.filterVehicleGroup.length === 0 ? true : false;

      this.isUserVehicleGroupEmpty = this.filterUserVehicleGroup.length === 0 ? true : false;

      this.cdr.detectChanges();
    })
  }

  onSearchUserChange() {
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

  onSearchVehicleGroupChange() {
    if (this.searchVehicleGroup.trim() === '') {
      this.filterVehicleGroup = [...this.treeNotInGroup];
      return;
    }

    this.filterVehicleGroup = this.filterTree(this.treeNotInGroup, this.searchVehicleGroup);

    this.isVehicleGroupEmpty = this.filterVehicleGroup.length === 0 ? true : false;

    this.cdr.detectChanges();
  }

  onSearchUserVehicleGroupChange() {
    if (this.searchUserVehicleGroup.trim() === '') {
      this.filterUserVehicleGroup = [...this.treeInGroup];
      return;
    }

    this.filterUserVehicleGroup = this.filterTree(this.treeInGroup, this.searchUserVehicleGroup);

    this.isUserVehicleGroupEmpty = this.filterUserVehicleGroup.length === 0 ? true : false;

    this.cdr.detectChanges();
  }

  onOptionSelected(event: UserDto) {
    this.selectUserId = event.pk_userID.toUpperCase();
    this.getVehicleGroup();
  }

  onSave() {
    console.log(this.selectedVehicleGroupFiles);
    console.log(this.selectedUserVehicleGroupFiles);
  }

  private buildTree(groups: GetDataTreeDto[]): TreeNode[] {
    // Tạo một đối tượng map để lưu trữ các nhóm theo PK_VehicleGroupID
    const groupMap: { [key: number]: TreeNode } = {};

    const tree: TreeNode[] = [];

    // Duyệt qua tất cả các nhóm phương tiện và khởi tạo một TreeNode cho mỗi nhóm
    groups.forEach(group => {
      groupMap[group.id] = {
        label: group.label,
        data: group.label,
        icon: 'pi pi-fw pi-folder',
        children: []
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
    Object.values(groupMap).forEach(node => {
      if (node.children && node.children.length > 0) {
        node.label = `${node.label} (${node.children.length} xe)`;
      }
    });

    // Trả về kết quả cây phân cấp
    return tree;
  }

  private filterTree(tree: TreeNode[], keyword: string): TreeNode[] {
    // Hàm đệ quy để lọc từng node
    const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
      const filteredNodes: TreeNode[] = [];

      nodes.forEach(node => {
        // Kiểm tra nếu node hiện tại hoặc bất kỳ con nào của nó khớp với từ khóa
        const children = node.children ? filterNodes(node.children) : [];
        const isMatch = node.label?.toLowerCase().includes(keyword.toLowerCase());

        if (isMatch || children.length > 0) {
          // Nếu node khớp hoặc bất kỳ con nào khớp, thêm node vào danh sách kết quả
          filteredNodes.push({
            ...node,
            children: children // Chỉ giữ lại các con khớp
          });
        }
      });

      return filteredNodes;
    };

    // Gọi hàm đệ quy với cây hiện tại
    return filterNodes(tree);
  }
}
