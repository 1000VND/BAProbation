import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PictureVehicle } from '../../../../models/vehicle-group';
import { HttpClient } from '@angular/common/http';
import saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { MediaPhotoComponent } from '../../../media-photo/media-photo.component';
import { Pagination } from '../../../../models/common';

@Component({
  selector: 'ba-picture-card-detail',
  templateUrl: './picture-card-detail.component.html',
  styleUrls: ['./picture-card-detail.component.scss']
})
export class PictureCardDetailComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() pictures: PictureVehicle[] = [];
  @Input() pagination: Pagination = { currentPage: 1, itemsPerPage: 50, totalItems: 0, totalPages: 0 };
  @Input() vehiclePlate: string = '';
  @Input() set index(value: number) {
    this.currentIndex = value;
  };

  get picture() {
    return this.pictures[this.saveIndex];
  }

  get totalImages() {
    return this.pictures.length;
  }

  @Output() closeModal = new EventEmitter<void>();

  autoViewImage: boolean = false;
  autoSlideInterval: any;
  transition: string = '';
  currentIndex: number = 0;
  saveIndex: number = 0;

  constructor(
    private http: HttpClient,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  /**
   * Mở modal xem chi tiết 
   */
  showModal() {
    this.saveIndex = this.currentIndex;
    this.show = true;
  }

  /**
   * Đóng modal xem chi tiết
   */
  closeDetail() {
    this.show = false;
    this.autoViewImage = true;
    this.autoSlideImage();
  }

  /**
   * Tải ảnh
   * @param infoVehicle Thông tin xe
   * @returns  
   */
  downloadFile(infoVehicle: PictureVehicle) {
    if (!infoVehicle.photoUrl) {
      this._toastr.error('URL không hợp lệ');
      return;
    }

    const date = new Date(infoVehicle.timePicture);
    const formattedTime = `${this.padZero(date.getDate())}${this.padZero(date.getMonth() + 1)}${date.getFullYear()}_${this.padZero(date.getHours())}${this.padZero(date.getMinutes())}${this.padZero(date.getSeconds())}`;

    this.http.get(infoVehicle.photoUrl, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        saveAs(blob, `${infoVehicle.vehiclePlate}_${formattedTime}.jpg`);
      },
      error: () => {
        this._toastr.error('Có lỗi xảy ra trong quá trình tải ảnh');
      }
    });
  }

  /**
   * Chuyển đến ảnh trước
   */
  previousImage() {
    if (this.saveIndex > 0) {
      this.transition = 'fade-custom';
      setTimeout(() => {
        this.saveIndex--;
        this.transition = '';
      }, 300);
    }
  }

  /**
   * Chuyển đến ảnh tiếp theo
   */
  nextImage() {
    if (this.saveIndex < this.pictures.length - 1) {
      this.transition = 'fade-custom';
      setTimeout(() => {
        this.saveIndex++;
        this.transition = '';
      }, 300);
    }
  }

  /**
   * Xem ảnh tự động
   */
  autoSlideImage() {
    this.autoViewImage = !this.autoViewImage;

    if (this.autoViewImage) {
      this.autoSlideInterval = setInterval(() => {
        if (this.saveIndex < this.pictures.length - 1) {
          this.transition = 'fade-custom';

          setTimeout(() => {
            this.saveIndex++;
            this.transition = '';
          }, 300);
        } else {
          this.autoSlideImage();

          this._toastr.info('Đã xem hết ảnh');
        }
      }, 3000);
    } else {
      clearInterval(this.autoSlideInterval);
    }
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
