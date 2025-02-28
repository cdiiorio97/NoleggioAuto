export class MyTableConfig{
    headers: MyHeaders[] | undefined;
    pagination: MyPagination | undefined;
}

export interface MyHeaders {
    name: string;
    field: string;
    sorting?: "asc" | "desc";
    visibile: boolean;
    css?: any;
}

export interface MyActions{
    label?: string | undefined;
    field?: string;
    icon?: string;
    iconPosition?: string;
    css?: any | undefined;
}

export interface MyPagination{
    itemPerPage: number | undefined;
}
