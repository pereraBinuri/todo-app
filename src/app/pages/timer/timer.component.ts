import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  minutes: string = '00';
  seconds: string = '00';
  inputMinutes: number = 0;
  private timerInterval: any;


  startTimer(): void{
    let totalSeconds = this.inputMinutes * 60;
    if(totalSeconds <= 0){
      alert('Please enter a valid time')
      return;
    }
    clearInterval(this.timerInterval); // Clear any existing intervals
    this.timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        this.minutes = this.formatTime(Math.floor(totalSeconds / 60));
        this.seconds = this.formatTime(totalSeconds % 60);
      } else {
        clearInterval(this.timerInterval);
        alert('Time is up!');
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  resetTimer(): void {
    this.stopTimer();
    this.minutes = '00';
    this.seconds = '00';
    this.inputMinutes = 0;
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  
}
