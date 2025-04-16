import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginatedResult } from "../models/common";
import { map } from "rxjs";

/**
 * Lấy dữ liệu phân trang từ Headers của response và xử lý dữ liệu trả về.
 * @template T Kiểu dữ liệu của kết quả trả về.
 * @param url Đường dẫn API cần gọi.
 * @param params Các tham số truy vấn (query parameters) gửi kèm yêu cầu.
 * @param http Đối tượng HttpClient để thực hiện yêu cầu HTTP.
 * @returns Observable chứa đối tượng PaginatedResult, bao gồm dữ liệu và thông tin phân trang.
 */
export function paginatedResultGet<T>(url: string, params: HttpParams, http: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return http.get<T>(url, { observe: 'response', params }).pipe(
        map(response => {
            if (response.body) {
                paginatedResult.result = response.body;
            }
            const pagination = response.headers.get('Pagination');
            if (pagination) {
                paginatedResult.pagination = JSON.parse(pagination);
            }
            return paginatedResult;
        })
    );
}

/**
 * Tương tự như function get, thay vì tạo body parameter, ta sẽ tạo body để gửi lên server.
 * @template T 
 * @param url 
 * @param body 
 * @param http 
 * @returns  
 */
export function paginatedResultPost<T>(url: string, body: any, http: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return http.post<T>(url, body, { observe: 'response' }).pipe(
        map(response => {
            if (response.body) {
                paginatedResult.result = response.body;
            }
            const pagination = response.headers.get('Pagination');
            if (pagination) {
                paginatedResult.pagination = JSON.parse(pagination);
            }
            return paginatedResult;
        })
    );
}

/**
 * Tạo các tham số phân trang
 * @param pageNumber Trang hiện tại
 * @param pageSize Số lượng bản ghi trên 1 trang
 * @returns  
 */
export function createBodyParam(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return params;
}