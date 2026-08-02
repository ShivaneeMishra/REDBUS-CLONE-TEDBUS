import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
declare var google : any;
import { Customer } from '../../service/customer';
import { Customer as CustomerModel } from '../../model/customer.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  isDarkMode: boolean = false;


  constructor(private router:Router,private customerservice:Customer,private cdr:ChangeDetectorRef,private translate:TranslateService){}
  isLoggedIn:boolean=false
  ngOnInit(): void {
    if(sessionStorage.getItem("Loggedinuser")){
    this.isLoggedIn=true
  }else{
    this.isLoggedIn=false
  }

     //google.accounts.id.initialize({
      //client_id:'826997276246-v9hldbj9qca23jd50vopnep7esc3jve8.apps.googleusercontent.com',
      //callback:(response:any)=>{this.handlelogin(response)}
      
    //})
    const savedLang = localStorage.getItem('preferredLanguage');
    if(savedLang){
      this.translate.use(savedLang);
    }
    const savedTheme = localStorage.getItem('tedbus_theme');
    this.isDarkMode = savedTheme === 'dark';
    if (this.isDarkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}


    
    
    
  }
  toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
  
  if (this.isDarkMode) {
    localStorage.setItem('tedbus_theme', 'dark');
    document.documentElement.classList.add('dark'); // 'dark' क्लास जोड़ेगा
  } else {
    localStorage.setItem('tedbus_theme', 'light');
    document.documentElement.classList.remove('dark'); // 'dark' क्लास हटाएगा
  }
}

  ngAfterViewInit():void{
    this.rendergooglebutton();
  }

  private rendergooglebutton():void{
    const googlebtn=document.getElementById('google-btn');
    if(googlebtn){
      google.accounts.id.renderButton(googlebtn,{
        theme:'outline',
        size:'medium',
        shape:'pill',
        width:150,
      })
    }
  }
  private decodetoken(token:String){
    return JSON.parse(atob(token.split(".")[1]))
  }
  handlelogin(response:any){
    const payload=this.decodetoken(response.credential)
    //console.log(payload)
    this.customerservice.addcustomermongo(payload).subscribe({
      next:(response)=>{
        console.log('Post success',response);
        sessionStorage.setItem("Loggedinuser",JSON.stringify(response))
        this.isLoggedIn=true;
        this.cdr.detectChanges();
       
      }
      
    })
   
  }
  handlelogout(){
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('Loggedinuser');
    window.location.reload()
  }
  navigate(route:string){
  this.router.navigate([route])
}
switchLanguage(event: any) {
    const lang = event.target.value;
    console.log("Selected Language:",lang)
    this.translate.use(lang);
   

    localStorage.setItem('preferredLanguage',lang)
     this.cdr.detectChanges();
  }
  
}
