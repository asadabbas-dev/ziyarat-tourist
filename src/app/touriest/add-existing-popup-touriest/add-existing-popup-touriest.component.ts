import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TouristService } from 'src/app/_services/tourist.service';

@Component({
  selector: 'app-add-existing-popup-touriest',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, NgFor, MatSelectModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatDialogModule],
  templateUrl: './add-existing-popup-touriest.component.html',
  styleUrls: ['./add-existing-popup-touriest.component.css']
})
export class AddExistingPopupTouriestComponent {
  selectedOptions: string[] = [];
  options: string[] = [];
  completeData: any[] = [];
  @Output() saveSelectedOptions = new EventEmitter<string[]>();

  constructor(private _existingUser: TouristService,) { }
  ngOnInit(): void {
    this.getExistingUserdata();
    // this.getExistingUserList();
    console.log(this.selectedOptions)
  }
  getExistingUserdata() {
    this._existingUser.getTouriestName().subscribe((data: any[]) => {
      console.log("this is a get api :", data)
      this.options = data.map((item) => item.name);
      this.completeData = data;
      console.log("this is under completeData",this.completeData)
    });
  }
  save() {
    debugger
    const selectedRows = this.options.filter((data) => this.selectedOptions.includes(data)).map((selectedOption) => {
      console.log("this is under selectedOption",selectedOption)

      // Find the corresponding row data for the selected option
      return this.completeData.find((item) => item.name === selectedOption);
    });
    console.log("this is under selectedRows",selectedRows)

    this.saveSelectedOptions.emit(selectedRows);
    console.log("this is saveSelectedOptions",this.saveSelectedOptions)
  }

}

