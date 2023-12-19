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
      return `¿De dónde viene?
Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32

El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.`;
      // return 'Hey, sorry this is an error, check the console or retry';
    }

  }

}
