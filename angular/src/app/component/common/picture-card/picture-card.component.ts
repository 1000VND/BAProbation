import { saveAs } from 'file-saver';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PictureVehicle } from '../../../models/vehicle-group';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PictureCardDetailComponent } from './picture-card-detail/picture-card-detail.component';
import { Pagination } from '../../../models/common';

@Component({
  selector: 'ba-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent implements OnInit {
  @ViewChild('detail') detail: PictureCardDetailComponent | undefined;

  @Input() pictures: PictureVehicle[] = [];
  @Input() index: number = 0;
  @Input() pagination: Pagination = { currentPage: 1, itemsPerPage: 50, totalItems: 0, totalPages: 0 };
  @Input() vehiclePlate: string = '';
  @Output() clickForMore = new EventEmitter<void>();

  get picture() {
    return this.pictures[this.index];
  }
  displayModal: boolean = false;

  constructor(
    private http: HttpClient,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
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

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
