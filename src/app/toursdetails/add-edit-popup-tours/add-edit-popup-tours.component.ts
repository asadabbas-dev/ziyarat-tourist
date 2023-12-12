import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../_services/country.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-add-edit-popup-tours',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, NgFor, MatSelectModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule],
  templateUrl: './add-edit-popup-tours.component.html',
  styleUrls: ['./add-edit-popup-tours.component.css']
})
export class AddEditPopupToursComponent implements OnInit {
  selectedOptions: string[] = [];
  options: string[] = [];
  constructor(private _empService: UserService,) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }
  getEmployeeList() {
    debugger;
    this._empService.getUser().subscribe((data: any[]) => {
      this.options = data.map((item) => item.firstName);
    });
  }
}
