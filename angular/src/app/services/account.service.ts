import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Users } from "../data/seed-data";

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    private currentUserSource = new BehaviorSubject<User | null>(null);
    currentUserBaGPS$ = this.currentUserSource.asObservable();

    constructor(
        private router: Router,
        private translate: TranslateService,
        private toastr: ToastrService,
    ) {
        this.loadUserFromLocalStorage();
    }

    /**
     * Đăng nhập
     */
    login(username: string, password: string, rememberMe: boolean): Observable<boolean> {
        const user = Users.find(u => u.username === username && u.password === password);
        if (user) {

            /**
             * Kiểm tra xem người dùng đã được kích hoạt tài khoản hay chưa
             */
            if (!user.isActive) {
                this.toastr.warning(this.translate.instant('CanNotLogInRightNow'));
                return of(false);
            }

            const userWithoutPassword = {
                id: user.id,
                username: user.username,
                password: undefined,
                isActive: user.isActive
            };

            document.cookie = `currentUserBaGPS=${encodeURIComponent(JSON.stringify(userWithoutPassword))}; path=/; Secure`;
            /**
             * Lưu phiên đăng nhập khi tích Ghi nhớ mật khẩu
             */
            if (rememberMe) {
                localStorage.setItem('currentUserBaGPS', JSON.stringify(userWithoutPassword));
            }

            this.setCurrentUser(userWithoutPassword);
            this.router.navigate(['/dashboard']);
            return of(true);
        } else {
            this.toastr.warning(this.translate.instant('IncorrectUserNamePassword'));
            return of(false);
        }
    }

    /**
     * Đăng xuất
     * Xóa dữ liệu của phiên làm việc
     */
    logout() {
        document.cookie = 'currentUserBaGPS=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        localStorage.removeItem('currentUserBaGPS');
        this.currentUserSource.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Cập nhật user vào BehaviorSubject
     */
    setCurrentUser(user: User) {
        this.currentUserSource.next(user);
    }

    /**
     * Lấy dữ liệu User
     */
    getCurrentUser(): User | null {
        const userCookie = this.getCookie('currentUserBaGPS');
        const user = localStorage.getItem('currentUserBaGPS');
        return userCookie ? JSON.parse(userCookie) : (user ? JSON.parse(user) : null);
    }

    /**
     * Load từ localStorage khi ứng dụng khởi động
     */
    private loadUserFromLocalStorage() {
        const user = this.getCurrentUser();
        if (user) {
            this.setCurrentUser(user);
        }
    }

    private getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

}