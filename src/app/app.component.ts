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

  title = 'ng-gemini-test';
  result = '';
  prompt = '';

  constructor(private googleGeminiPro: GoogleGeminiProService) {
    this.googleGeminiPro.initialize(key);
  }

  async generate() {
    this.result = await this.googleGeminiPro.generateText(this.prompt);
  }

}
