import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';


@Injectable({
  providedIn: 'root'
})
export class GoogleGeminiProService {

  genIA: any;
  model: any;


  initialize(key: string, config?: any) {

    this.genIA = new GoogleGenerativeAI(key);
    let model = config ? config : { model: 'gemini-pro' };
    this.model = this.genIA.getGenerativeModel(model);

  }

  async generateText(prompt: string) {

    if (!this.model) {
      return;
    }

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;

      return response.text();
    }
    catch (e) {
      console.error(e);
      return 'Hey, sorry this is an error, check the console or retry';
    }

  }

}
