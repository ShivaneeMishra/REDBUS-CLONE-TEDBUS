import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  imports: [MatTableModule, MatDialogModule]
})
export class Dialog {
  to: string = '';
  position: number = 0;
  from : string = '';
  nobus: number = 0;
  dataSource = Element_data;
  displayedColumns: string[] = ['position', 'from', 'to', 'nobus'];
  constructor(public dialogRef: MatDialogRef<Dialog>) {}
  OnNoClick(): void {
    this.dialogRef.close();
  }

}

interface DialogElement {
  position: number;
  from: string;
  to: string;
  nobus: number;
}

const Element_data: DialogElement[] = [
  {
    position: 1,
    from: 'Delhi',
    to: 'Jaipur',
    nobus: 2
  },
  {
    position: 2,
    from: 'Mumbai',
    to: 'Goa',
    nobus: 2
  },
  {
    position: 3,
    from: 'Bangalore',
    to: 'Mysore',
    nobus: 2
  },
  {
    position: 4,
    from: 'Kolkata',
    to: 'Darjeeling',
    nobus: 2
  },
  {
    position: 5,
    from: 'Chennai',
    to: 'Pondicherry',
    nobus: 2
  }
]


