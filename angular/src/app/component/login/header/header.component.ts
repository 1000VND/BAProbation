import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../../services/account.service';
import { map } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  visible: boolean = false;
  languages: { code: string, name: string, icon: string }[] = [
    { code: 'vi', name: 'Vietnamese', icon: 'vn-flag.png' },
    { code: 'en', name: 'English', icon: 'gl-flag.png' },
  ];

  selectedLanguage: { code: string, name: string, icon: string } = this.languages[0];
  dropdownOpen = false;
  isLogin: boolean = false;

  constructor(
    private translate: TranslateService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accountService.currentUserBaGPS$.pipe(map(user => {
      this.isLogin = !!user
    })).subscribe();

    this.languageConfig();
  }

  /**
   * Thay đổi ngôn ngữ hệ thống
   * @param language 
   */
  changeLanguage(language: { code: string, name: string, icon: string }) {
    this.selectedLanguage = language;
    this.translate.use(this.selectedLanguage.code.toString());
    localStorage.setItem('lang', this.selectedLanguage.code);
  }

  /**
   * Đóng/Mở Menu
   */
  openCloseMenu() {
    this.visible = !this.visible;
  }

  logout() {
    this.accountService.logout();
  }

  /**
   * Hiển thị Label ngôn ngữ mặc định hoặc đã được cấu hình từ
   * phiên làm việc trước
   */
  private languageConfig() {
    let language = localStorage.getItem('lang');
    if (language) {
      this.selectedLanguage = this.languages.find(e => e.code == language) || this.languages[0];
    } else {
      this.selectedLanguage = this.languages[0]
    }
  }

}
