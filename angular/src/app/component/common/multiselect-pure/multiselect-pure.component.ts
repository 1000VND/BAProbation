import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ba-multiselect-pure',
  templateUrl: './multiselect-pure.component.html',
  styleUrls: ['./multiselect-pure.component.scss']
})
export class MultiselectPureComponent implements OnInit {
  @Input() options: { label: string; value: number }[] = [];
  @Output() selectionChange = new EventEmitter<number[]>();

  isOpen = false;
  searchText = '';
  selectedOptions: { label: string; value: number }[] = [];
  filteredOptions: { label: string; value: number }[] = [];
  isSearching = false;
  isForcus = false;
  placeholder = 'Chọn kênh';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const container = document.querySelector('.multiselect-container');

    if (container && !container.contains(target)) {
      this.isOpen = false;
      this.isForcus = false;
      this.searchText = '';
    }
  }

  constructor() { }

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  get selectedDisplay(): string {
    if (this.selectedOptions.length === 0) {
      return this.placeholder;
    } else if (this.selectedOptions.length === 1) {
      return this.selectedOptions[0].label;
    } else {
      return `Đã chọn ${this.selectedOptions.length} mục`;
    }
  }

  toggleDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.isForcus = false;
      this.searchText = '';
    }

    this.filterOptions();
  }

  onClickOutside(): void {
    this.isOpen = false;
  }

  filterOptions(): void {
    if (!this.searchText.trim()) {
      this.isSearching = false;
      this.filteredOptions = [...this.options];
    } else {
      this.isSearching = true;
      const searchLower = this.searchText.toLowerCase().trim();
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(searchLower)
      );
    }
  }

  toggleOption(option: { label: string; value: number }): void {
    const index = this.selectedOptions.findIndex(item => item.value === option.value);

    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }

    this.emitSelectionChange();
  }

  isSelected(option: { label: string; value: number }): boolean {
    return this.selectedOptions.some(item => item.value === option.value);
  }

  toggleSelectAll(): void {
    if (this.areAllSelected()) {
      this.selectedOptions = [];
    } else {
      this.selectedOptions = [...this.options];
    }

    this.emitSelectionChange();
  }

  areAllSelected(): boolean {
    return this.options.length > 0 && this.selectedOptions.length === this.options.length;
  }

  isIndeterminate(): boolean {
    return this.selectedOptions.length > 0 && this.selectedOptions.length < this.options.length;
  }

  onInputFocus() {
    this.isForcus = false;
    this.isOpen = true;
    this.searchText = '';
    this.filterOptions();
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit(this.selectedOptions.map(option => option.value));
  }

}
