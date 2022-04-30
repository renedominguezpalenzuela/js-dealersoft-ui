import { Injectable } from '@angular/core';
import { Column } from '@core/lib/dynamic-table/utils/interfaces';

@Injectable({ providedIn: 'root' })
export class DynamicTableService {

  private readonly columnSelectedMap: Map<string, Column[]> = new Map<string, Column[]>();

  constructor() {
    if (localStorage.getItem('column-selected-map'))
      this.columnSelectedMap
        = new Map<string, Column[]>(JSON.parse(<string>localStorage.getItem('column-selected-map')));
    else {
      this.columnSelectedMap = new Map<string, Column[]>();
      this.updateStorage();
    }
  }

  public hasUrl = (url: string): boolean => this.columnSelectedMap.has(url);

  public setUrl = (url: string, data: Column[]) => {
    this.columnSelectedMap.set(url, data);
    this.updateStorage();
  }

  public getData = (url: string): Column[] | undefined => this.columnSelectedMap.get(url);

  private updateStorage = () => {
    const data: any[] = [];
    this.columnSelectedMap.forEach((value, key) => data.push([key, value]));
    localStorage.setItem('column-selected-map', JSON.stringify(data));
  };
}
