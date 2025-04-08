import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataDashboards, Factories } from '../../../data/seed-data';
import { DataChart } from '../../../models/data-dashboard';

@Component({
  selector: 'vehicle-at-factory',
  templateUrl: './vehicle-at-factory.component.html',
  styleUrls: ['./vehicle-at-factory.component.scss']
})
export class VehicleAtFactoryComponent implements OnInit {

  /**
   * Lấy dữ liệu cho biểu đồ cột
   */
  @Input() set vehicleSelected(vehicle: string[]) {
    this.dataSource = this.countDataBarFactory(vehicle);
    this.vehicleSelectSaved = vehicle;
  }

  /**
   * Thay đổi chiều rông của widget
   */
  @HostBinding('class') get hostClasses() {
    return this.widthWidget;
  }

  widthWidget: string = 'width-fit-content';
  dataSource: DataChart[] = [];
  vehicleSelectSaved: string[] = [];

  constructor() { }

  ngOnInit() { }

  /**
   * Thay đổi độ rộng của widget
   * @param width 
   */
  changeWidth(width: string) {
    setTimeout(() => {
      this.widthWidget = width;
    }, 0);
  }

  /**
   * Lấy lại dữ liệu
   */
  callBackData() {
    this.dataSource = this.countDataBarFactory(this.vehicleSelectSaved);
  }

  /**
   * Lấy dữ liệu cho biểu đồ cột dựa vào lựa chọn (MultiSelect)
   * @param [licensePlate] 
   * @returns data bar factory 
   */
  private countDataBarFactory(licensePlate: string[] = []): DataChart[] {
    this.dataSource = [];

    const isAllData = licensePlate.length === 0 || licensePlate[0].includes('Tất cả');

    // Lọc các phương tiện đang ở nhà máy
    const vehicle = DataDashboards.filter(e => (isAllData || licensePlate.includes(e.vehicle)) && e.vehicleAtFactory)
      .map(item => item.vehicleAtFactory);

    return Factories.map((factory) => {
      // Tìm xem có bao nhiêu phương tiện ở nhà máy này
      const count = vehicle.filter(e => e === factory.id).length;
      return {
        name: factory.name,
        value: count
      };
    });
  }

}
