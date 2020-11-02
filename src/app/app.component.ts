import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  private _game: Game;
  public get game(): Game {
    return this._game;
  }

  constructor() {
    this._game= new Game();
  }
}

export class Answer {
  public get title(): string {
    return this._title;
  }

  public get isCorrect(): boolean {
    return this._isCorrect;
  }

  constructor(private _title: string, private _isCorrect: boolean = false) {

  }
}

type Answers = [Answer, Answer, Answer, Answer];

export class Question {

  public get title(): string {
    return this._title;
  }

  public get answers(): Answers {
    return this._answers;
  }

  constructor(private _title: string, private _answers: Answers) {

  }
}

export class Game {

  private _questions: Array<Question>;
  private _questionIndex: number;

  private _selectedAnswer: Answer;
  public get selectedAnswer(): Answer {
    return this._selectedAnswer;
  }
  
  private _isAnswerConfirmed: boolean;
  public get isAnswerConfirmed(): boolean {
    return this._isAnswerConfirmed;
  }

  constructor() {
    this._questions = [
      new Question('Какой химический элемент назван в честь злого подземного гнома?',
        [
          new Answer('A: Гафний'),
          new Answer('B: Кобальт', true),
          new Answer('C: Бериллий'),
          new Answer('D: Теллур')
        ]
      ),
      new Question('Как называется один из видов жуков?',
        [
          new Answer('A: Артиллерист'),
          new Answer('B: Kомандор'),
          new Answer('C: Канонир'),
          new Answer('D: Бомбардир', true)
        ]
      )];
    this._questionIndex = 0;
    this._isAnswerConfirmed = false;
  }

  public getQuestion(): Question {
    return this._questions[this._questionIndex];
  }

  public selectAnswerHandler(answer: Answer): void {
    this._selectedAnswer = answer;
  }

  public confirmAnswer(): void {
    if (!this._selectedAnswer) {
      throw new Error('no one answer was not selected');
    }
    this._isAnswerConfirmed = true;
  }

  public nextQuestionHandler(): void {
    this._questionIndex++;
    this._selectedAnswer = null;
    this._isAnswerConfirmed = false;
  }
}