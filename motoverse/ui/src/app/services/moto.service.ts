import { Injectable } from '@angular/core';
import { Moto } from '../interfaces/moto.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoService {
  private motos: Moto[] = [
    {
      id: 1,
      marca: 'Honda',
      modelo: 'CB 500F',
      ano: 2022,
      preco: 35000,
      quilometragem: 5000,
      descricao: 'A Honda CG 160 Titan é uma moto urbana que se destaca pela confiabilidade mecânica, economia e visual moderno. Equipada com motor monocilíndrico de 162,7cc com tecnologia FlexOne, oferece um ótimo equilíbrio entre desempenho e baixo consumo de combustível, ideal para o dia a dia. Seu design traz linhas marcantes, tanque com carenagens esportivas e lanterna traseira em LED, reforçando um visual mais arrojado e atual. A suspensão dianteira telescópica e a traseira com sistema de amortecimento duplo proporcionam conforto mesmo em pisos irregulares, enquanto os freios combinados (CBS) garantem mais segurança nas frenagens. Com painel digital completo, rodas de liga leve e partida elétrica, a CG 160 Titan entrega praticidade, eficiência e durabilidade',
      imagem: 'assets/images/cb500f.jpg',
      disponivel: true
    },
    {
      id: 2,
      marca: 'Yamaha',
      modelo: 'MT-07',
      ano: 2021,
      preco: 42000,
      quilometragem: 8000,
      descricao: 'A Honda XRE 190 é uma moto versátil e robusta, ideal para quem procura conforto e desempenho tanto no asfalto quanto em estradas de terra. Equipada com um motor monocilíndrico de 184,4cc com injeção eletrônica e tecnologia FlexOne, oferece economia de combustível e boa performance em diferentes condições de uso. Seu visual aventureiro combina carenagens imponentes, farol em LED e para-brisa elevado, transmitindo personalidade e prontidão para qualquer desafio. A suspensão dianteira telescópica de longo curso e a traseira com sistema monoamortecido garantem mais estabilidade e absorção de impactos, enquanto os freios a disco com ABS na dianteira proporcionam mais segurança na pilotagem. Leve, ágil e confortável, a XRE 190 é uma excelente escolha para deslocamentos urbanos, viagens curtas e trilhas leves, unindo praticidade, durabilidade e o espírito aventureiro característico da linha XRE.',
      imagem: 'assets/images/mt07.jpg',
      disponivel: true
    },
    {
      id: 3,
      marca: 'Kawasaki',
      modelo: 'Ninja 650',
      ano: 2023,
      preco: 45000,
      quilometragem: 2000,
      descricao: 'Moto esportiva com excelente desempenho',
      imagem: 'assets/images/ninja650.jpg',
      disponivel: true
    }
  ];

  constructor() { }

  getMotos(): Observable<Moto[]> {
    return of(this.motos);
  }

  getMotoById(id: number): Observable<Moto | undefined> {
    return of(this.motos.find(moto => moto.id === id));
  }

  adicionarMoto(moto: Moto): Observable<Moto> {
    moto.id = this.motos.length + 1;
    this.motos.push(moto);
    return of(moto);
  }

  atualizarMoto(moto: Moto): Observable<Moto> {
    const index = this.motos.findIndex(m => m.id === moto.id);
    if (index !== -1) {
      this.motos[index] = moto;
    }
    return of(moto);
  }

  excluirMoto(id: number): Observable<boolean> {
    const index = this.motos.findIndex(m => m.id === id);
    if (index !== -1) {
      this.motos.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
} 