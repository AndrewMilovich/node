export interface IPagination<T>{
    page: number,
    perPage: number,
    itemCount: number,
    data: T[]
}
