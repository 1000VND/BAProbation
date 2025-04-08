import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AccountService } from "../services/account.service";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private accountService: AccountService,
        private router: Router,
    ) { }

    /**
     * Xác định xem có thể kích hoạt hay không
     * @returns activate 
     */
    canActivate(): Observable<boolean> {
        return this.accountService.currentUserBaGPS$.pipe(
            map(user => {
                if (user) return true;
                /**
                 * Nếu currentUserBaGPS$ chưa có dữ liệu, thử lấy từ localStorage
                 */
                const localUser = this.accountService.getCurrentUser();

                if (localUser) {
                    /**
                     * Cập nhật user vào BehaviorSubject
                     */
                    this.accountService.setCurrentUser(localUser);
                    return true;
                }

                /**
                 * Nếu không có user, chuyển hướng về login
                 */
                this.router.navigateByUrl('/login');
                return false;
            })
        );
    }
}