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

  private _isAnswerSelected: boolean;
  public get isAnswerSelected(): boolean {
    return this._isAnswerSelected;
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
      ),
      new Question('Как жители Лондона прозвали небоскреб Мэри-Экс, спроектированный Норманом Фостером?',
        [
          new Answer('A: Корнишон', true),
          new Answer('B: Баклажан'),
          new Answer('C: Кабачок'),
          new Answer('D: Патиссон')
        ]
      ),
      new Question('Что не бывает морским?',
          [
            new Answer('A: Рельс', true),
            new Answer('B: Огурец'),
            new Answer('C: Гребешок'),
            new Answer('D: Узел')
          ]
      ),
      new Question('С чем часто охотятся на рыбу протоптера между сезонами дождей?',
          [
            new Answer('A: С сетями'),
            new Answer('B: С сачкамир'),
            new Answer('C: С ружьями'),
            new Answer('D: С лопатами', true)
          ]
        )
    ];
    this._questionIndex = 0;
    this._isAnswerConfirmed = false;
    this._isAnswerSelected = false;
  }

  public getQuestion(): Question {
    return this._questions[this._questionIndex];
  }

  public selectAnswerHandler(answer: Answer): void {
    this._selectedAnswer = answer;
    this._isAnswerSelected = true;
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
    this._isAnswerSelected = false;
  }

  public getAnswerView(answer: Answer): {[key:string]: boolean}{
    return {
      'chosen-answer': this._selectedAnswer === answer,
      'correct-answer': this._isAnswerConfirmed && answer.isCorrect,
      'incorrect-answer': this._selectedAnswer === answer && this._isAnswerConfirmed && !answer.isCorrect
    }

  } 



}