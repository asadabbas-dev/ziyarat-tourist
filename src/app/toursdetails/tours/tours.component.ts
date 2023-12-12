import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditPopupToursComponent } from '../add-edit-popup-tours/add-edit-popup-tours.component';
import { MatIconModule } from '@angular/material/icon';
import { TourService } from 'src/app/_services/tour.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,MatIconModule, MatDialogModule, MatButtonModule, MatGridListModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
  displayedColumns: string[] = ['id','title', 'description', 'startDate', 'endDate'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private _tourService: TourService,) {}
  ngOnInit(): void {
    this.getTourList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    openDialog() {
    this.dialog.open(AddEditPopupToursComponent,{
      width: '700px',
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getTourList() {
    debugger;
    this._tourService.getAllTour().subscribe({
      next: (res) => {
        debugger;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

}
