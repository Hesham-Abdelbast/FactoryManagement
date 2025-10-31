import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableAction } from '../../../model/table-action';
import { PageEvent } from '../../../model/page-event';


@Component({
  selector: 'app-h-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './h-table.component.html',
  styleUrls: ['./h-table.component.scss']
})
export class HTableComponent<T = any> {

  /** Detect page direction (ltr/rtl) from <body dir="..."> */
  dir: string | null = 'ltr';

  /** text Search on change the value will set here */
  textSearch:string='';

  // =============================
  // Inputs
  // =============================

  /** Entity name shown in top bar */
  @Input({ required: true }) entityName = '';

  /** Show / hide actions column */
  @Input() enableActions = false;

  /** Actions column header text (only required if enableActions = true) */
  @Input() actionName = 'Actions';

  /** Primary key field name (e.g., "id") */
  @Input({ required: true }) P_Key = '';

  /** Show / hide Search Input */
  @Input() enableSearch = false;

  /**  Search placeholder text */
  @Input() placeholdeSearch = '';

  /** Show / hide Add button */
  @Input() enableAdd = false;

  /** Add button text */
  @Input() addText = '';

  /** Add button Icon */
  @Input() addIcon = '';

  /** Show / hide Export button */
  @Input() enableExport = false;

  /** export button text */
  @Input() exportText = '';

  /** export button Icon */
  @Input() exportIcon = '';

  /** Show / hide Filter button */
  @Input() enableFilter = false;

  /** Show / hide order th */
  @Input() showOrder = false;

  /** text of order th */
  @Input() orderTitle = '';

  /** text of order key col */
  @Input() orderKey = '';

    /** filter button text */
  @Input() filtertText = '';

  /** filter button Icon */
  @Input() filterIcon = '';
  
  /** Table header text (e.g., "Students List") */
  @Input({ required: true }) headerText = '';

  /** Display Column definitions for table header */
  @Input({ required: true }) displayColumns: string[] = [];

  /** Column definitions (keys of data objects) */
  @Input({ required: true }) keyColumns: string[] = [];

  /** Table data rows */
  @Input({ required: true }) data: T[] = [];

  /** Row actions (buttons like view/edit/delete) */
  @Input() actions: TableAction[] = [];

  // =============================
  // Pagination
  // =============================

  /** Show / hide pagination */
  @Input() showPagination = false;

  /** Current page index (1-based) */
  @Input() pageIndex = 1;

  /** Page size */
  @Input() pageSize = 10;

  /** Total records */
  @Input() total = 0;

  /** Page size options */
  @Input() pageSizeOptions = [5, 10, 25, 50];

    /** Pageination page Text */
  @Input() page: string = '';

  /** Pageination Item Per Page Text */
  @Input() ItemPerPage: string = '';

  // =============================
  // Outputs
  // =============================

  /** Fired when user clicks "Export" button */
  @Output() onExportEvent = new EventEmitter<void>();

  /** Fired when user clicks "Filter" button */
  @Output() onFilterEvent = new EventEmitter<void>();

  /** Fired when user clicks "Add" button */
  @Output() onAddEvent = new EventEmitter<void>();

  /** Fired when user search Inputch Change */
  @Output() onSarchChangeEvent = new EventEmitter<string>();

  /** Fired when user changes page */
  @Output() pageChangeEvent = new EventEmitter<PageEvent>();

  /** Fired when user clicks an action button */
  @Output() actionClick = new EventEmitter<{ action: string; row: T }>();

  /** Fired when user click in up order button */
  @Output() onMoveUp = new EventEmitter<string>();

  /** Fired when user click in up order button */
  @Output() onMoveDown = new EventEmitter<string>();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  // =============================
  // Computed values
  // =============================

  /** Total number of pages */
  get totalPages(): number {
    return this.pageSize > 0 ? Math.max(1, Math.ceil(this.total / this.pageSize)) : 1;
  }

  /** Get cell value dynamically from row by column key */
  getCellValue(row: T, col: string): any {
    return (row as any)?.[col] ?? ''; // fallback to empty string
  }

  /** Get current direction (ltr/rtl) */
  getDir(): string{
    this.dir = this.document.body.getAttribute('dir');
    return this.dir?.toString() ?? 'ltr';
  }

  // =============================
  // Pagination methods
  // =============================

  goToFirst() {
    if (this.pageIndex > 1) {
      this.pageIndex = 1;
      this.emitPageChange();
    }
  }

  goToPrev() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.emitPageChange();
    }
  }

  goToNext() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.emitPageChange();
    }
  }

  goToLast() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex = this.totalPages;
      this.emitPageChange();
    }
  }

  pageSizeChange() {
    this.pageIndex = 1; // reset to first page
    this.emitPageChange();
  }

  goToPage(index: number) {
    this.pageIndex = index;
    this.emitPageChange();
  }

  /** Emit page change event */
  private emitPageChange() {
    this.pageChangeEvent.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize });
  }

  // =============================
  // Actions
  // =============================

  /** Emit action click with row data */
  onActionClick(action: TableAction, rowData: T) {
    this.actionClick.emit({ action: action.type, row: rowData });
  }
  onSearchChange(){
    this.onSarchChangeEvent.emit(this.textSearch);
  }

  moveUp(order:string){
    this.onMoveUp.emit(order);
  }
  
  moveDown(order:string){
    this.onMoveDown.emit(order);
  }
}
