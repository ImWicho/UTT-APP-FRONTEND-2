import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { DialogService } from '@services/dialog.service';
import { ProvidersDialogComponent } from 'app/main/pages/orders/components/providers-dialog/providers-dialog.component';
import { AppStateWithUser } from 'app/main/store/userStore/reducers';
import { Subscription } from 'rxjs';
import { AnswerQuizDialogComponent } from '../../components/answer-quiz-dialog/answer-quiz-dialog.component';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-index-quizes',
  templateUrl: './index-quizes.component.html',
  styleUrls: ['./index-quizes.component.scss']
})
export class IndexQuizesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'created_at', 'totalProviders', 'totalMissing', 'options'];
  dataSource!: MatTableDataSource<any>;
  quizes = [];
  sub!: Subscription;
  constructor(private quizService: QuizService,
              private store: Store<AppStateWithUser>,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getQuizes();
  }

  getQuizes(): void{
    this.sub = this.store.select('user').subscribe((data) => {
      if(data.user?.id === '1'){
        this.getQuizesAdmin();
      }else{
        this.getQuizesByArea();
      }
    });
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  async onOpenAnswerQuiz(data: any): Promise<void>{
    if(await this.dialogService.onShowDialogData(
      AnswerQuizDialogComponent,
      data, { width: 900 }).toPromise()
      ){
        this.getQuizes();


    }
  }

  onOpenDialogProvider(data: any): void{
    this.dialogService.onShowDialogData(ProvidersDialogComponent, data, { width: 500 });
  }

  getQuizesByArea(): void{
   this.quizService.onGetQuizesByArea().subscribe((data) => {
     this.filterData(data);
   });
  }


  getQuizesAdmin(): void{
    this.quizService.onGetQuizes().subscribe((data) => {
      this.filterData(data);
    });
   }

  filterData(data: any): void{
    this.quizes = data.map((x: any) => ({
        ...x,
        totalProviders : x.providers.filter((p: any) => p.status_id === '1').length,
        totalMissing : x.providers.filter((p: any) => p.status_id !== '1').length,
      }));
    this.setData();
  }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.quizes;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
