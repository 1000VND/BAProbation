import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-tree-multiselect',
  templateUrl: './tree-multiselect.component.html',
  styleUrls: ['./tree-multiselect.component.scss']
})
export class TreeMultiselectComponent implements OnInit {
  dropdownOpen: boolean = false;
  searchTerm: string = '';
  selectedItems: string[] = [];
  treeData: any[] = [
    {
      key: '0',
      label: 'Documents',
      data: 'Documents Folder',
      icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '0-0',
          label: 'Work',
          data: 'Work Folder',
          icon: 'pi pi-fw pi-cog',
          children: [
            { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
            { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
          ]
        },
        {
          key: '0-1',
          label: 'Home',
          data: 'Home Folder',
          icon: 'pi pi-fw pi-home',
          children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
      ]
    },
    {
      key: '1',
      label: 'Events',
      data: 'Events Folder',
      icon: 'pi pi-fw pi-calendar',
      children: [
        { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
        { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
        { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
      ]
    },
    {
      key: '2',
      label: 'Movies',
      data: 'Movies Folder',
      icon: 'pi pi-fw pi-star-fill',
      children: [
        {
          key: '2-0',
          icon: 'pi pi-fw pi-star-fill',
          label: 'Al Pacino',
          data: 'Pacino Movies',
          children: [
            { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
            { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
          ]
        },
        {
          key: '2-1',
          label: 'Robert De Niro',
          icon: 'pi pi-fw pi-star-fill',
          data: 'De Niro Movies',
          children: [
            { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
            { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
          ]
        }
      ]
    }
  ];

  filteredTreeData: any[] = [];

  constructor() { }

  ngOnInit() {
    this.filteredTreeData = this.treeData;
    this.addParentReferences(this.treeData);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleNodeSelection(node: any) {
    if (this.isNodeSelected(node)) {
      this.deselectNode(node);
    } else {
      this.selectNode(node);
    }
    this.updateParentState(node);
  }

  selectNode(node: any) {
    if (!this.selectedItems.includes(node.label)) {
      this.selectedItems.push(node.label);
    }
    if (node.children) {
      node.children.forEach((child: any) => this.selectNode(child));
    }
  }

  deselectNode(node: any) {
    this.selectedItems = this.selectedItems.filter((item) => item !== node.label);
    if (node.children) {
      node.children.forEach((child: any) => this.deselectNode(child));
    }
  }

  isNodeSelected(node: any): boolean {
    return this.selectedItems.includes(node.label);
  }

  filterTree() {
    if (!this.searchTerm) {
      this.filteredTreeData = this.treeData; // Hiển thị toàn bộ cây nếu không có từ khóa tìm kiếm
    } else {
      this.filteredTreeData = this.filterTreeNodes(this.treeData, this.searchTerm.toLowerCase());
    }
  }

  filterTreeNodes(nodes: any[], searchTerm: string): any[] {
    return nodes
      .map((node) => {
        const children = node.children ? this.filterTreeNodes(node.children, searchTerm) : [];
        if (node.label.toLowerCase().includes(searchTerm) || children.length > 0) {
          return { ...node, children };
        }
        return null;
      })
      .filter((node) => node !== null);
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selectedItems = []; // Deselect all
    } else {
      this.selectedItems = this.getAllNodeLabels(this.treeData); // Select all
    }
  }

  isAllSelected(): boolean {
    const allNodeLabels = this.getAllNodeLabels(this.treeData);
    return allNodeLabels.every((label) => this.selectedItems.includes(label));
  }

  getAllNodeLabels(nodes: any[]): string[] {
    let labels: string[] = [];
    nodes.forEach((node) => {
      labels.push(node.label);
      if (node.children) {
        labels = labels.concat(this.getAllNodeLabels(node.children));
      }
    });
    return labels;
  }

  isNodeIndeterminate(node: any): boolean {
    if (!node.children || node.children.length === 0) {
      return false; // Node không có con thì không thể ở trạng thái indeterminate
    }

    const selectedChildren = node.children.filter((child: any) => this.isNodeSelected(child));
    return selectedChildren.length > 0 && selectedChildren.length < node.children.length;
  }

  updateParentState(node: any) {
    if (!node.parent) {
      return; // Nếu node không có cha, không cần cập nhật
    }

    const parent = node.parent;
    const selectedChildren = parent.children.filter((child: any) => this.isNodeSelected(child));
    const allChildrenSelected = selectedChildren.length === parent.children.length;

    if (allChildrenSelected) {
      this.selectNode(parent);
    } else if (selectedChildren.length === 0) {
      this.deselectNode(parent);
    }

    // Recursive call to update the parent's parent
    this.updateParentState(parent);
  }

  addParentReferences(nodes: any[], parent: any = null) {
    nodes.forEach((node) => {
      node.parent = parent; // Thêm tham chiếu đến node cha
      if (node.children) {
        this.addParentReferences(node.children, node);
      }
    });
  }
}
