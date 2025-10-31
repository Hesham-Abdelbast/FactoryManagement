import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-h-modal',
  imports: [],
  templateUrl: './h-modal.component.html',
  styleUrl: './h-modal.component.scss'
})
export class HModalComponent {
  @Input() headerTitle!: string;
  @Input() menuFooterFlg: boolean = false;

  @Output() closeEvent = new EventEmitter<void>();

  closeDialog() {
    this.closeEvent.emit();
  }
}
