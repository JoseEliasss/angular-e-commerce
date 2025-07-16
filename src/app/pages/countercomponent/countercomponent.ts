import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { map, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-countercomponent',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './countercomponent.html',
  styleUrl: './countercomponent.scss',
})
export class Countercomponent {
  @Input() seconds = 300;

  timeRemaining$ = timer(0, 1000).pipe(
    map((n) => (this.seconds - n) * 1000),
    takeWhile((n) => n >= 0)
  );
}
