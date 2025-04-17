import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ba-multiselect',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [ // Giúp cho component này có thể được sử dụng như một value accessor trong Angular Forms
    {
      provide: NG_VALUE_ACCESSOR,  // Cung cấp value accessor cho Angular Forms
      useExisting: forwardRef(() => MultiSelectComponent),  // Sử dụng component MultiSelectComponent làm provider cho NG_VALUE_ACCESSOR
      multi: true  // Cho phép nhiều provider cho NG_VALUE_ACCESSOR, vì một component có thể làm nhiều thứ
    }
  ]
})
export class MultiSelectComponent implements OnInit {
  @Input() set dataSelect(data: { label: any; value: any; itemGroup?: any }[]) {
    this.options = data.map(e => {
      return {
        label: e.label,
        value: e.value,
        itemGroup: `Tất cả (${data.length})`
      }
    });
  }

  @Input() selectedOptions: any[] = [];
  @Input() defaultLabel: string = "Choose";
  @Output() onChangeValue = new EventEmitter();

  options: { label: any; value: any; itemGroup?: any }[] = [];

  private onChange: Function = new Function();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  writeValue(val: any): void {
    this.selectedOptions = val ?? ""
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  changeValue() {
    if (typeof this.onChange === 'function') {
      this.onChange(this.selectedOptions);
    }
    this.onChangeValue.emit(this.filter(this.selectedOptions));
  }

  filter(select: any[]) {
    const hasAllOption = select.some(item => typeof item === 'string' && item.includes('Tất cả'));
    if (hasAllOption) {
      return [0];
    }
    return this.selectedOptions;
  }
}
