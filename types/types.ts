export type Pagination<T> = {
    data: T[]
    total: number
    page: number
    page_size: number
}
