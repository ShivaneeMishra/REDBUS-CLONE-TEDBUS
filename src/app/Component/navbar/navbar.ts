import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
declare var google: any;
import { Customer } from '../../service/customer';
import { Customer as CustomerModel } from '../../model/customer.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  isDarkMode: boolean = false;
 

  constructor(
    private router: Router,
    private customerservice: Customer,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    
  ) {}
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    if (sessionStorage.getItem('Loggedinuser')) {
      this.isLoggedIn = true;
      this.cdr.detectChanges();
    } else {  
      this.isLoggedIn = false;
    }
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: '826997276246-v9hldbj9qca23jd50vopnep7esc3jve8.apps.googleusercontent.com',
        callback: (response: any) => {
          this.handlelogin(response);
          this.cdr.detectChanges();
        }
    

    
    });
  }
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      this.translate.use(savedLang);
    }
    const savedTheme = localStorage.getItem('tedbus_theme');
    this.isDarkMode = savedTheme === 'dark';
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTimeout(() => {
    const targetNode = document.getElementById('google-btn');
    if (targetNode) {
      const observer = new MutationObserver(() => {
        if (targetNode.childElementCount === 0) {
          this.renderDesktopGoogleButton();
        }
      });
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  }, 1000);
}
toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      localStorage.setItem('tedbus_theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('tedbus_theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }

  ngAfterViewInit(): void {
    this.renderDesktopGoogleButton();
  }
  
renderDesktopGoogleButton(): void {
  setTimeout(() => {
    const desktopBtn = document.getElementById('google-btn');
    if (desktopBtn && typeof google !== 'undefined') {
      desktopBtn.innerHTML = '';
      google.accounts.id.renderButton(desktopBtn, {
        theme: 'outline',
        size: 'medium',
        shape: 'pill',
        width: 220,
      });
    }
  }, 200);
}


renderMobileGoogleButton(): void {
  
  setTimeout(() => {
    const mobileBtn = document.getElementById('google-btn-mobile');
    if (mobileBtn && typeof google !== 'undefined' && google.accounts) {
      console.log(mobileBtn)
      mobileBtn.innerHTML = '';
      google.accounts.id.renderButton(mobileBtn, {
        theme: 'outline',
        size: 'medium',
        shape: 'pill',
        width: 200,
      });
    }
  }, 400); 
}

   
  private decodetoken(token: String) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  handlelogin(response: any) {
    const payload = this.decodetoken(response.credential);
    //console.log(payload)
    this.customerservice.addcustomermongo(payload).subscribe({
      next: (response) => {
        console.log('Post success', response);
        sessionStorage.setItem('Loggedinuser', JSON.stringify(response));
        this.isLoggedIn = true;
        this.cdr.detectChanges();
      },
    });
  }
  handlelogout() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('Loggedinuser');
    window.location.reload();
  }
  navigate(route: string) {
    this.router.navigate([route]);
  }
  switchLanguage(event: any) {
    const lang = event.target.value;
    console.log('Selected Language:', lang);
    this.translate.use(lang);

    localStorage.setItem('preferredLanguage', lang);
    this.cdr.detectChanges();
  }
}
