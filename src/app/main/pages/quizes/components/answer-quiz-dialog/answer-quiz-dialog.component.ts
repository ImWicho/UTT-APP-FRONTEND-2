import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { NotificationService } from '@services/notification.service';
import { IScore } from '../../interfaces/i-score';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-answer-quiz-dialog',
  templateUrl: './answer-quiz-dialog.component.html',
  styleUrls: ['./answer-quiz-dialog.component.scss']
})
export class AnswerQuizDialogComponent implements OnInit {
  providers: any = [];
  scores: IScore[] = [];
  form!: FormGroup;
  resultId: FormControl = new FormControl(null, [Validators.required]);
  isLoading = false;
  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private quizService: QuizService,
              private notificationService: NotificationService,
              private dialog: MatDialogRef<AnswerQuizDialogComponent>) { this.onBuldForm();  }

  ngOnInit(): void {
    this.providers = this.data.results.filter((x: any) => x.provider.status_id === '1');
    this.onGetScores();
  }

  onGetScores(): void{
    this.quizService.onGetScores().subscribe((data) => {
      this.scores = data;
    });
  }

  onBuldForm(): void{
    this.form = this.fb.group({
      one: [null, [Validators.required]],
      two: [null, [Validators.required]],
      three: [null, [Validators.required]],
      four: [null, [Validators.required]],
    });
  }

  onEvaluate(): void{
    const data = {
      resultId : this.resultId.value,
      scores : Object.values(this.form.value)
    };
    this.isLoading = true;
    this.quizService.onSaveResults(data).subscribe(() => {
      this.notificationService.onShowNotification({
        title: 'Proveedor evaluado',
        desc: 'El proveedor ha sido evaluado correctamente.',
        type: TOAST_TYPE.SUCCESS
      });
      this.dialog.close(true);
    }, (error: HttpErrorResponse) => {
      this.isLoading = false;
      this.notificationService.onShowNotification({
        title: 'Ocurrió un error',
        desc: 'Intente más tarde o contacte a soporte.',
        type: TOAST_TYPE.DANGER
      });
    });


  }

}
