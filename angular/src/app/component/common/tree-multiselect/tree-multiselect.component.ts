import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { GetDataTreeDto, TreeNode } from '../../../models/common';

@Component({
  selector: 'ba-tree-multiselect',
  templateUrl: './tree-multiselect.component.html',
  styleUrls: ['./tree-multiselect.component.scss']
})
export class TreeMultiselectComponent implements OnInit {
  @Input() set data(value: GetDataTreeDto[]) {
    this.originalData = value;
    this.filteredTreeData = this.buildTree(value);
    this.totalValueParent = this.countNodes(this.filteredTreeData);
  }
  @Output() ngOnChange = new EventEmitter<number[]>();

  dropdownOpen = false;
  searchTerm = '';
  selectedItems: number[] = [];
  selectedNodes: TreeNode[] = [];
  filteredTreeData: TreeNode[] = [];
  originalData: GetDataTreeDto[] = [];
  totalValueParent = 0;

  get selectedItemsDisplay(): string {
    if (this.selectedNodes.length >= 3) {
      return `Đã chọn ${this.selectedNodes.length} nhóm`;
    }

    return this.selectedNodes.length > 0
      ? this.selectedNodes.map(node => node.label).join(', ')
      : 'Chọn nhóm phương tiện';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const treeMultiselect = document.querySelector('.tree-multiselect');
    if (treeMultiselect && !treeMultiselect.contains(target)) {
      this.dropdownOpen = false;
    }
  }

  ngOnInit() { }

  /**
   * Mở hoặc đóng dropdown
   */
  toggleDropdown() {
    this.searchTerm = ''; // Reset tìm kiếm khi mở dropdown
    this.filterTree();
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Chọn hoặc bỏ chọn các node trong cây
   * @param node 
   */
  toggleNodeSelection(node: TreeNode) {
    this.isNodeSelected(node) ? this.unselectNode(node) : this.selectNode(node);
    this.updateParentState(node);
  }

  /**
   * Chọn các node trong cây
   * @param node 
   */
  selectNode(node: TreeNode) {
    if (!this.selectedItems.includes(node.data)) {
      this.selectedItems.push(node.data);
      this.selectedNodes.push(node);
    }
    node.children?.forEach(child => this.selectNode(child)); // Chọn tất cả các node con
    this.updateParentState(node); // Cập nhật trạng thái của node cha
    this.emitSelectedItems();
  }

  /**
   * Bỏ chọn các node trong cây
   * @param node 
   */
  unselectNode(node: TreeNode) {
    this.selectedItems = this.selectedItems.filter(item => item !== node.data);
    this.selectedNodes = this.selectedNodes.filter(item => item.data !== node.data);
    node.children?.forEach(child => this.unselectNode(child)); // Bỏ chọn tất cả các node con
    this.updateParentState(node); // Cập nhật trạng thái của node cha
    this.emitSelectedItems();
  }

  /**
   * Chọn hoặc bỏ chọn tất cả các node trong cây
   */
  toggleSelectAll() {
    if (this.isAllSelected()) {
      // Hủy chọn tất cả
      this.selectedItems = [];
      this.selectedNodes = [];
      this.clearAllSelections(this.filteredTreeData);
    } else {
      // Chọn tất cả
      this.selectedItems = [0];
      this.selectedNodes = this.getAllNodes(this.filteredTreeData);
      this.selectAllNodes(this.filteredTreeData);
    }

    // Emit danh sách data của các node đã chọn (chỉ emit một lần)
    this.emitSelectedItems();
  }

  /**
   * Kiểm tra xem node đã được chọn hay chưa
   * @param node 
   * @returns true if node selected 
   */
  isNodeSelected(node: TreeNode): boolean {
    return this.selectedItems.includes(node.data);
  }

  /**
   * Kiểm tra xem tất cả các node đã được chọn hay chưa
   * @returns true if all selected 
   */
  isAllSelected(): boolean {
    // Kiểm tra nếu tất cả các node đã được chọn hoặc nếu selectedItems chứa [0]
    const allNodeData = this.getAllNodeData(this.filteredTreeData);
    return this.selectedItems.length === 1 && this.selectedItems[0] === 0 ||
      allNodeData.every(data => this.selectedItems.includes(data));
  }

  /**
   * Kiểm tra xem node có trạng thái indeterminate hay không
   * @param node 
   * @returns true if node indeterminate 
   */
  isNodeIndeterminate(node: TreeNode): boolean {
    if (!node.children?.length) return false; // Nếu không có con, không thể là indeterminate
    const selectedChildren = node.children.filter(child => this.isNodeSelected(child));
    return selectedChildren.length > 0 && selectedChildren.length < node.children.length;
  }

  /**
   * Lọc cây dựa trên searchTerm
   */
  filterTree() {
    if (!this.searchTerm.trim()) {
      // Nếu searchTerm rỗng, khôi phục lại dữ liệu ban đầu
      this.filteredTreeData = this.buildTree(this.originalData);
    } else {
      // Nếu có searchTerm, thực hiện lọc
      this.filteredTreeData = this.filterTreeNodes(this.buildTree(this.originalData), this.searchTerm.toLowerCase());
    }

    // Tính toán lại tổng số node cha sau khi lọc
    this.totalValueParent = this.countNodes(this.filteredTreeData);
  }

  /**
   * Mở rộng hoặc thu gọn các node trong cây
   * @param node 
   */
  toggleNodeExpand(node: TreeNode) {
    node.expanded = !node.expanded; // Đảo ngược trạng thái mở rộng
  }

  /**
   * Lấy tất cả các node trong cây
   * @param nodes 
   * @returns all nodes 
   */
  private getAllNodes(nodes: TreeNode[]): TreeNode[] {
    let allNodes: TreeNode[] = [];
    nodes.forEach((node) => {
      allNodes.push(node); // Thêm node hiện tại vào danh sách
      if (node.children) {
        allNodes = allNodes.concat(this.getAllNodes(node.children)); // Đệ quy thêm các node con
      }
    });
    return allNodes;
  }

  /**
   * Lọc các node trong cây dựa trên searchTerm
   * @param nodes 
   * @param searchTerm Dữ liệu tìm kiếm
   * @returns tree nodes 
   */
  private filterTreeNodes(nodes: TreeNode[], searchTerm: string): TreeNode[] {
    return nodes
      .map(node => {
        const children = node.children ? this.filterTreeNodes(node.children, searchTerm) : [];
        return node.label.toLowerCase().includes(searchTerm) || children.length
          ? { ...node, children }
          : null;
      })
      .filter(node => node !== null) as TreeNode[];
  }

  /**
   * Chọn tất cả các node trong cây
   * @param nodes 
   */
  private selectAllNodes(nodes: TreeNode[]) {
    nodes.forEach(node => {
      if (!this.isNodeSelected(node)) {
        this.selectedItems.push(node.data);
        this.selectedNodes.push(node);
      }
      if (node.children) {
        this.selectAllNodes(node.children);
      }
    });
  }

  /**
   * Hủy chọn tất cả các node trong cây
   * @param nodes 
   */
  private clearAllSelections(nodes: TreeNode[]) {
    nodes.forEach(node => {
      this.selectedItems = this.selectedItems.filter(item => item !== node.data);
      this.selectedNodes = this.selectedNodes.filter(item => item.data !== node.data);
      if (node.children) {
        this.clearAllSelections(node.children);
      }
    });
  }

  /**
   * Cập nhật trạng thái của các node cha dựa trên trạng thái của node hiện tại
   * @param node 
   * @returns  
   */
  private updateParentState(node: TreeNode) {
    if (!node.parent) return;

    const parent = node.parent;
    const selectedChildren = parent.children?.filter(child => this.isNodeSelected(child)) || [];
    const allChildrenSelected = selectedChildren.length === parent.children?.length;

    if (allChildrenSelected) {
      this.selectNode(parent); // Chọn node cha nếu tất cả các node con được chọn
    } else {
      // Không chọn node cha, cũng không bỏ chọn, để trạng thái indeterminate cho checkbox
      this.selectedItems = this.selectedItems.filter(item => item !== parent.data);
      this.selectedNodes = this.selectedNodes.filter(item => item.data !== parent.data);
    }

    this.updateParentState(parent);
  }

  /**
   * Lấy tất cả Id của các node trong cây
   * @param nodes 
   * @returns all node data 
   */
  private getAllNodeData(nodes: TreeNode[]): number[] {
    return nodes.reduce((acc, node) => {
      acc.push(node.data);
      if (node.children) acc.push(...this.getAllNodeData(node.children));
      return acc;
    }, [] as number[]);
  }

  /**
   * Đếm số lượng node trong cây hiện tại
   * @param nodes Danh sách các node trong cây
   * @returns nodes 
   */
  private countNodes(nodes: TreeNode[]): number {
    return nodes.reduce((count, node) => {
      return count + 1 + (node.children ? this.countNodes(node.children) : 0);
    }, 0);
  }

  /**
   * Tạo cây từ danh sách các nhóm
   * @param groups Danh sách các nhóm (raw data)
   * @returns tree 
   */
  private buildTree(groups: GetDataTreeDto[]): TreeNode[] {
    // Tạo một map để lưu trữ các node theo id
    const groupMap: { [key: number]: TreeNode } = {};

    // Mảng để lưu trữ các node gốc (không có parentId)
    const tree: TreeNode[] = [];

    // Tạo các node từ danh sách nhóm và lưu vào groupMap
    groups.forEach(group => {
      groupMap[group.id] = { label: group.label, data: group.id, children: [], expanded: true };
    });

    // Duyệt qua danh sách nhóm để xây dựng cây
    groups.forEach(group => {
      // Nếu không có parentId, thêm vào mảng gốc
      if (group.parentId === 0) {
        tree.push(groupMap[group.id]);
      } else {
        // Nếu có parentId, thêm vào node cha tương ứng
        const parentNode = groupMap[group.parentId];
        const childNode = groupMap[group.id];

        if (parentNode && childNode) {
          // Đặt tham chiếu của nút cha cho nút con
          childNode.parent = parentNode;
          parentNode.children?.push(childNode);
        }
      }
    });

    return tree;
  }

  /**
   * Trả ra danh sách các item đã chọn
   */
  private emitSelectedItems() {
    this.ngOnChange.emit([...this.selectedItems]); // Emit danh sách cuối cùng
  }
}