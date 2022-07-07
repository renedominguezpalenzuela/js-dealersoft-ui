export interface Column {
  header: string;
  column: string;
  show: boolean;
  type: ColumnType;
  prop?: string;
  ordenar:boolean;
}

export enum ColumnType {
  Regular = 1,
  Concat = 2,
  Bullets = 3,
  Boolean = 4,
  Date = 5,
  InnerHTML = 6,
  SellStatus = 7,
  ExternalLink = 8,
  MailTo = 9,
  CallTo = 10,
  Currency = 11,
  Extra = 12
}
