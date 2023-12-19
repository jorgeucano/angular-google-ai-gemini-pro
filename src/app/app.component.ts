import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { key } from '../key';
import { GoogleGeminiProService } from './services/google-gemini-pro.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    RouterOutlet, MatInputModule,
    MatButtonModule, MatGridListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  result = '';
  prompt = '';
  writing = false;

  constructor(private googleGeminiPro: GoogleGeminiProService) {
    this.googleGeminiPro.initialize(key);
  }

  async generate() {
    this.writing = true;
    const result = await this.googleGeminiPro.generateText(this.prompt);
    console.log(result);
    this.write(result, 0);
  }

  write(result: string, index: number) {
    this.result = result.slice(0, index);
    if (index < result.length) {
      setTimeout(() => {
        this.write(result, index + 1)
      }, this.randomVelocity());
    }
    else {
      this.writing = false;
      console.log('done');
    }
  }

  randomVelocity(): number {
    const velocity = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    console.log(velocity);
    return velocity;
  }

}
