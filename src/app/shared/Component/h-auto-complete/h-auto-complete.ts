import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
export interface AutoItem {
  key: any;
  value: string;
}

@Component({
  selector: 'app-h-auto-complete',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule
    ],
  templateUrl: './h-auto-complete.html',
  styleUrls: ['./h-auto-complete.scss']
})
export class HAutoCompleteComponent implements OnInit {

  @Input() data: AutoItem[] = [];
  @Input() placeholder: string = 'اختر عنصر...';

  @Output() valueSelected = new EventEmitter<any>();

  control = new FormControl('');
  filteredItems: AutoItem[] = [];
  showDropdown: boolean = false;

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      const val = value?.toLowerCase() || '';
      this.filteredItems = this.data.filter(item => item.value.toLowerCase().includes(val));
      this.showDropdown = this.filteredItems.length > 0;
    });
  }

  selectItem(item: AutoItem) {
    this.control.setValue(item.value);
    this.valueSelected.emit(item.key);
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.h-auto-complete')) {
      this.showDropdown = false;
    }
  }
}
