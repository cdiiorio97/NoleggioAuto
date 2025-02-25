export class MyTableConfig{
    headers: MyHeaders[] | undefined;
    pagination: MyPagination | undefined;
    actions: MyActions[] | undefined;
}

export interface MyHeaders {
    name: string;
    field: string;
    sorting: "asc" | "desc";
    visibile: boolean;
}

export interface MyActions{
    label: string | undefined;
    field?: string;
    css: any | undefined;
}

export interface MyPagination{
    itemPerPage: number | undefined;
}
