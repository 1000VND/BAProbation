import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../../../models/common';

@Component({
  selector: 'ba-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 50;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<Pagination>();

  constructor() { }

  totalPages: number = 0;
  visiblePages: (number | string)[] = [];
  startItem: number = 0;
  endItem: number = 0;

  ngOnInit() {
    this.calculatePages();
  }

  ngOnChanges() {
    this.calculatePages();
    this.updatePageInfo();
  }

  /**
   * Cập nhật thông tin trang hiện tại
   */
  updatePageInfo() {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  /**
   * Tính toán số trang và các trang hiển thị
   */
  calculatePages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    this.visiblePages = [];

    if (this.totalPages <= 7) {
      // Hiển thị tất cả các trang nếu tổng số trang nhỏ hơn hoặc bằng 7
      for (let i = 1; i <= (this.totalPages <= 0 ? 1 : this.totalPages); i++) {
        this.visiblePages.push(i);
      }
    } else {
      // Hiển thị các trang với dấu "..." nếu tổng số trang lớn hơn 7
      if (this.currentPage <= 4) {
        // Case 1: Current page is near the beginning
        this.visiblePages = [1, 2, 3, 4, 5, '...', this.totalPages];
      } else if (this.currentPage >= this.totalPages - 3) {
        // Case 2: Current page is near the end
        this.visiblePages = [1, '...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages];
      } else {
        // Case 3: Current page is in the middle
        this.visiblePages = [1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages];
      }
    }
  }

  /**
   * Đi đến trang cụ thể
   * @param page 
   * @returns  
   */
  goToPage(page: number | string) {
    if (typeof page === 'string' || page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.handlePageChange();
  }

  /**
   * Xử lý sự kiện khi thay đổi số lượng mục trên mỗi trang
   * @param itemsPerPage 
   */
  onChangeItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = Number(itemsPerPage);
    this.currentPage = 1;

    this.handlePageChange();
  }

  /**
   * Xử lý dữ liệu khi thay đổi trang
   */
  handlePageChange() {
    this.calculatePages();
    this.updatePageInfo();

    this.pageChange.emit({
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
      totalItems: this.totalItems,
      totalPages: this.totalPages
    });
  }

}
