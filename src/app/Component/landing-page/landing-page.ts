import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from './dialog/dialog';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  fromoption: string = '';
  tooption: string = '';
  date: string = '';
  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  fromEvent(option: string) {
    this.fromoption = option;
    console.log(this.fromoption);
  }

  toEvent(option: string) {
    this.tooption = option;
    console.log(this.tooption);
  }
  matchDate(event: any) {
    if (event.value) {
      const date = new Date(event.value);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      this.date = `${day}-${month}-${year}`;
    } else {
      this.date = 'null';
    }
    console.log(this.date);
  }
  isloggedIn(): boolean {
    return !!sessionStorage.getItem('Loggedinuser');
  }
  submit() {
    if (!this.isloggedIn()) {
      alert('Login to continue');
    } else {
      if (this.fromoption && this.tooption && this.date) {
        if (
          (this.fromoption === 'Delhi' && this.tooption === 'Jaipur') ||
          (this.fromoption === 'Mumbai' && this.tooption === 'Goa') ||
          (this.fromoption === 'Bangalore' && this.tooption === 'Mysore') ||
          (this.fromoption === 'Kolkata' && this.tooption === 'Darjeeling') ||
          (this.fromoption === 'Chennai' && this.tooption === 'Pondicherry')
        ) {
          this.router.navigate(['/select-bus'], {
            queryParams: {
              departure: this.fromoption,
              arrival: this.tooption,
              date: this.date,
            },
          });
        } else {
          const dialogRef = this.dialog.open(Dialog);

          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
          });
        }
      } else {
        alert('fill up the details!!!');
      }
    }
  }
}
