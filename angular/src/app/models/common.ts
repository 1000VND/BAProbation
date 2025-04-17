export interface ComboboxDto {
    label: string;
    value: number;
}

export interface GetDataTreeDto {
    id: number;
    parentId: number;
    label: string;
    key: string;
    countChildren?: number;
}

export interface TreeNode {
    label: string;
    data: number;
    children?: TreeNode[];
    expanded?: boolean;
    parent?: TreeNode;
}
export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result?: T;
    pagination?: Pagination;
}

export interface PaginationParams {
    pageNumber: number;
    pageSize: number;
}