import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'posterr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(public searchService: SearchService,
              public dialogRef: MatDialogRef<SearchComponent>) { }

  close(){
    this.dialogRef.close();
  }

  cancelSearch(){
    this.searchService.cancelSearch();
  }

  search(){
    this.searchService.search();
  }

}
