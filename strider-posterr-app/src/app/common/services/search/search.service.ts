import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchComponent } from '../../components/search/search.component';
import { DeviceService } from '../device/device.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private deviceService: DeviceService,
              private dialog: MatDialog) { }

  formSearch = new FormControl("", Validators.required);
  lastSearch = "";
  dialogSearch: MatDialogRef<SearchComponent>;

  private subjectSearch: BehaviorSubject<string> = new BehaviorSubject<string>("");
  search$: Observable<string> = this.subjectSearch.asObservable();

  private subjectCleanSearch: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  cleanSearch$: Observable<void> = this.subjectCleanSearch.asObservable();

  open(){
    this.formSearch.setValue(this.lastSearch);

    const subMobile = this.deviceService.isMobile$.subscribe(isMobile => {
      this.dialogSearch = this.dialog.open(SearchComponent, {
        width: isMobile ? "95%" : "40%",
        autoFocus: false,
        panelClass: "search-panel"
      });
    });

    subMobile.unsubscribe();
  }

  search(){
    this.dialogSearch.close();
    this.lastSearch = this.formSearch.value;
    this.subjectSearch.next(this.formSearch.value);
  }

  cancelSearch(){
    this.dialogSearch.close();
    this.lastSearch = "";
    this.formSearch.setValue(this.lastSearch);
    this.subjectCleanSearch.next();
  }
}
