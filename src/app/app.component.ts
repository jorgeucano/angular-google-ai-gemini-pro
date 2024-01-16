import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { key } from '../key';
import { GoogleGeminiProService } from './services/google-gemini-pro.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @ViewChild('scrollframe') scrollframe?: ElementRef;
  scroll() {
    const maxScroll = this.scrollframe?.nativeElement.scrollHeight;
    this.scrollframe?.nativeElement.scrollTo({ top: maxScroll, behavior: 'smooth' });
  }

  result = '';
  prompt = '';
  writing = false;

  questions: Array<{ prompt: string; result: string }> = [];

  constructor(private googleGeminiPro: GoogleGeminiProService) {
    this.googleGeminiPro.initialize(key);
  }

  async generate() {
    this.writing = true;
    const result = await this.googleGeminiPro.generateText(this.prompt);
    this.questions.push({ prompt: this.prompt, result: '' });
    this.write(result, 0);
  }

  write(result: string, index: number) {
    this.questions[this.questions.length - 1].result = result.slice(0, index);
    if (index < result.length) {
      setTimeout(() => {
        this.scroll();
        this.write(result, index + 1);        
      }, this.randomVelocity());
    }
    else {
      this.writing = false;
      this.prompt = '';
    }
  }

  randomVelocity(): number {
    const velocity = Math.floor(Math.random() * 25 + 1);
    return velocity;
  }

}
