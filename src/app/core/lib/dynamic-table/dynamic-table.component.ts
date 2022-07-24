import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from './table-data-source';
import { Column, ColumnType, OperationEvent, OptionSettings, PaginatorSettings } from './utils/interfaces';
import { MatSort } from '@angular/material/sort';
import { NestedPropertyPipe } from './utils/pipes';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Output() public operationEvent: EventEmitter<OperationEvent> = new EventEmitter<OperationEvent>();
  @Output() public paginationEvent: EventEmitter<number> = new EventEmitter<number>();
  
  @Input() public data: any[] = []; //recibo los datos a mostrar

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public columnType = ColumnType;
  @Input() public displayedColumns: Column[] = [];
  public columns: string[] = [];
  @Input() public showOptions = true;
  @Input() public canSticky: boolean | undefined = false;
  @Input() public startFieldSticky: string | undefined = undefined;
  @Input() public OptionSettings: OptionSettings = {
    options: [
      {
        icon: 'edit',
        literal: 'Update',
        color: '#388E3C',
        event: 'Update'
      },
      {
        icon: 'delete_outline',
        literal: 'Delete',
        color: '#F44336',
        event: 'Delete'
      }
    ]
  };
  @Input() public showPaginator: boolean = true;
  @Input() public pageCount: number = 100;
  @Input() public pageSize: number = 10;
  @Input() public page: number = 1;
  public PaginatorSettings: PaginatorSettings = {
    pageSize: this.pageSize,
    page: this.page,
    pageCount: this.pageCount,
    pageSizeOptions: [5, 20, 50, 100],
    pagination: [1, 2, 3]
  };
  @Input() public filterQuery: string = '';
  @Input() public endFieldSticky: string | undefined = undefined;
  @Input() public showExtraOption: boolean = false;
  @Input() public extraOption: { event: string, icon: string } | undefined;
  private sort: MatSort | undefined;
  @ViewChild(MatTable) private table: MatTable<any> | undefined;

  constructor(private readonly detectorRef: ChangeDetectorRef) {
  }

  @ViewChild(MatSort) set MatSort(sr: MatSort) {
    this.sort = sr;
    this.dataSource.sort = this.sort;
  }

  private static filterColumns = (displayedColumns: Column[]): Column[] => displayedColumns.filter(elm => elm.show);

  public ngOnInit(): void {

    this.dataSource.data = this.data;

    this.dataSource.filterPredicate = (data: Element, filter: string) => {
      let out = false;
      this.displayedColumns.forEach(col => {
        const value = new NestedPropertyPipe().transform(data, col.column)?.toString();
        
        if (!!value && value.toLowerCase()?.includes(filter.trim().toLowerCase())) {
          out = true;
          return;
        }
      });
      return out;
    };

    this.dataSource.filter = this.filterQuery;
    this.configColumns(this.displayedColumns);
    this.detectorRef.detectChanges();
  }

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterQuery']) this.dataSource.filter = changes['filterQuery'].currentValue;
    if (changes['data']) this.dataSource.data = changes['data'].currentValue;
    if (changes['displayedColumns']) this.configColumns(changes['displayedColumns'].currentValue);
    if (changes['pageCount']) this.PaginatorSettings.pageCount = +changes['pageCount'].currentValue;
    if (changes['page']) {
      this.PaginatorSettings.page = +changes['page'].currentValue;
      if (this.PaginatorSettings.page > 1) {
        const newPage = this.PaginatorSettings.page;
        this.PaginatorSettings.pagination = [newPage - 1, newPage, newPage + 1];
      } else {
        this.PaginatorSettings.pagination = [1, 2, 3];
      }
    }
    this.table?.renderRows();
    this.detectorRef.detectChanges();
  }

  public configColumns(data: Column[]) {
    this.displayedColumns = DynamicTableComponent.filterColumns(data);
    this.columns = this.displayedColumns.map(column => column.column);
    if (this.showOptions) this.columns = [...this.columns, 'op'];
    if (this.showExtraOption) this.columns = ['extraOption', ...this.columns]
  }

  public option(operation: string, value: any = null): void {
    this.operationEvent.emit({ type: operation, value: value });
  }

  public canBeStartSticky(column: string): false | undefined | boolean {
    return this.canSticky && (this.startFieldSticky === column);
  }

  public canBeEndSticky(column: string): false | undefined | boolean {
    return this.canSticky && (this.endFieldSticky === column);
  }

  public prevPag = () => {
    if (this.PaginatorSettings.page > 2) {
      const newPage = this.PaginatorSettings.page - 1;
      this.PaginatorSettings.pagination = [newPage - 1, newPage, newPage + 1];
      this.PaginatorSettings.page = newPage;
    } else {
      this.PaginatorSettings.pagination = [1, 2, 3];
      this.PaginatorSettings.page = 1;
    }
    this.paginationEvent.emit(this.PaginatorSettings.page);
  }

  public nextPag = () => {
    if (this.PaginatorSettings.page + 1 <= this.PaginatorSettings.pageCount) {
      const newPage = this.PaginatorSettings.page + 1;
      this.PaginatorSettings.pagination = [newPage - 1, newPage, newPage + 1];
      this.PaginatorSettings.page = newPage;
      this.paginationEvent.emit(this.PaginatorSettings.page);
    }
  }

  public toPage(pag: number) {
    this.PaginatorSettings.pagination = pag === 1 ? [pag, pag + 1] : [pag - 1, pag, pag + 1];
    this.PaginatorSettings.page = pag;
    this.paginationEvent.emit(this.PaginatorSettings.page);
  }
}
