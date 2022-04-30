export interface QueryParams {
  sort?: SortOption[],
  fields?: string[],
  populate?: string[],
  'pagination[withCount]'?: boolean,
  'pagination[page]'?: number,
  'pagination[pageSize]'?: number,
  'pagination[start]'?: number,
  'pagination[limit]'?: number,
  filters?: FilterOption[]
}

export interface SortOption {
  field: string,
  order: 'asc' | 'desc'
}

export interface FilterOption {
  field: string,
  operator: FilterOperator,
  value: string | number | boolean,
  option: FilterDeepOption
}

export enum FilterOperator {
  $eq = '$eq', //	Equal
  $ne = '$ne', //	Not equal
  $lt = '$lt', //	Less than
  $lte = '$lte', //	Less than or equal to
  $gt = '$gt', //	Greater than
  $gte = '$gte', //	Greater than or equal to
  $in = '$in', //	Included in an array
  $notIn = '$notIn', //	Not included in an array
  $contains = '$contains', //	Contains (case-sensitive)
  $notContains = '$notContains', //	Does not contain (case-sensitive)
  $containsi = '$containsi', //	Contains
  $notContainsi = '$notContainsi', //	Does not contain
  $null = '$null', //	Is null
  $notNull = '$notNull', //	Is not null
  $between = '$between', //	Is between
  $startsWith = '$startsWith', //	Starts with
  $endsWith = '$endsWith', // Ends with
}

export enum FilterDeepOption {
  $and = '$and',
  $or = '$or'
}

