import { map } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MeidaVehicleService } from '../../services/media-vehicle.service';
import { GetDataTreeDto, VehicleGroupDto } from '../../models/vehicle-group';
import { TreeNode } from 'primeng/api';
import { TreeSelect } from 'primeng/treeselect';

@Component({
  selector: 'media-photo',
  templateUrl: './media-photo.component.html',
  styleUrls: ['./media-photo.component.scss']
})
export class MediaPhotoComponent implements OnInit {
  @ViewChild('treeSelect') treeSelect!: TreeSelect;

  selectedGroup: TreeNode[] = [];
  nodeGroups: TreeNode[] = [];
  vehicles: { label: string; value: number }[] = [];
  emptyMessage = 'Không có dữ liệu';

  selectedItem: any;

  constructor(
    private _mediaVehicleService: MeidaVehicleService
  ) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this._mediaVehicleService.getGroups().subscribe((res) => {
      const dataInGroup: GetDataTreeDto[] = res.map(item => ({
        id: item.pK_VehicleGroupID,
        parentId: item.parentVehicleGroupID,
        label: item.name,
        key: item.pK_VehicleGroupID.toString(),
      }));

      const data = this.buildTree(dataInGroup);
      this.nodeGroups = [{
        label: `Tất cả (${dataInGroup.length})`,
        data: 0,
        key: '0',
        children: data,
        selectable: true,
        expanded: true,
      }];
    });
  }

  getVehicleGroupById(groupId: number[]) {
    this._mediaVehicleService.getVehicleGroupById(groupId).subscribe((res) => {
      this.vehicles = res.map(item => {
        return {
          label: item.plateAndCode,
          value: item.pK_VehicleID
        }
      });
    });
  }

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

  onChange(param: { value: VehicleGroupDto }) {
    console.log(param.value);
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
    Object.values(groupMap).forEach(node => {
      if (node.children && node.children.length > 0) {
        node.label = `${node.label} (${node.children.length} xe)`;
      }
    });

    // Trả về kết quả cây phân cấp
    return tree;
  }
}
