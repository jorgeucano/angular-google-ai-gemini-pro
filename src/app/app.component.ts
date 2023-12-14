import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { key } from '../key';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'ng-gemini-test';

  result = '';

  genAI = new GoogleGenerativeAI(key);
  model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

  constructor() {
    this.generate();
  }

  async generate() {
    console.log('start');

    const prompt = 'Write a story about an angular developer';

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    this.result = response.text();

    console.log(response);


    console.log('finished');
  }

}
