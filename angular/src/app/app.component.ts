import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private accountService: AccountService,
    private router: Router
  ) {
    // this.autoLogin();
    // this.setLanguage();
  }

  /**
   * Tự động login khi ghi nhớ mật khẩu từ phiên làm việc trước
   */
  autoLogin() {
    const user = this.accountService.getCurrentUser();
    if (user) {
      this.accountService.setCurrentUser(user);
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Load lại ngôn ngữ đã được áp dụng từ phiên làm việc trước
   * Nếu chưa có sẽ cấu hình mặc định là Tiếng Việt
   */
  setLanguage() {
    let language = localStorage.getItem('lang');
    if (language) {
      this.translate.use(language.toString());
    } else {
      this.translate.setDefaultLang('vi');
      this.translate.use('vi');
    }
  }
}
