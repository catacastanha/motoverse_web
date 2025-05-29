import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EstoqueComponent } from '../estoque/estoque.component';

interface Moto {
  id: number;
  nome: string;
  imagem: string;
  precoAntigo?: number;
  precoAtual: number;
  km: number;
  ano: number;
  descricao?: string;
}

type MotoId = 1 | 2 | 3 | 4 | 5 | 6;

@Component({
  selector: 'app-desc-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desc-produtos.component.html'
})
export class DescProdutosComponent implements OnInit {
  moto: Moto | undefined;
  private estoqueComponent = new EstoqueComponent();
  descricoes: { [key: number]: string } = {
    1: 'A Honda CG 160 Titan é uma moto urbana que se destaca pela confiabilidade mecânica, economia e visual moderno. Equipada com motor monocilíndrico de 162,7cc com tecnologia FlexOne, oferece um ótimo equilíbrio entre desempenho e baixo consumo de combustível, ideal para o dia a dia. Seu design traz linhas marcantes, tanque com carenagens esportivas e lanterna traseira em LED, reforçando um visual mais arrojado e atual. A suspensão dianteira telescópica e a traseira com sistema de amortecimento duplo proporcionam conforto mesmo em pisos irregulares, enquanto os freios combinados (CBS) garantem mais segurança nas frenagens. Com painel digital completo, rodas de liga leve e partida elétrica, a CG 160 Titan entrega praticidade, eficiência e durabilidade',
    2: 'A Honda XRE 190 é uma moto versátil e robusta, ideal para quem procura conforto e desempenho tanto no asfalto quanto em estradas de terra. Equipada com um motor monocilíndrico de 184,4cc com injeção eletrônica e tecnologia FlexOne, oferece economia de combustível e boa performance em diferentes condições de uso. Seu visual aventureiro combina carenagens imponentes, farol em LED e para-brisa elevado, transmitindo personalidade e prontidão para qualquer desafio. A suspensão dianteira telescópica de longo curso e a traseira com sistema monoamortecido garantem mais estabilidade e absorção de impactos, enquanto os freios a disco com ABS na dianteira proporcionam mais segurança na pilotagem. Leve, ágil e confortável, a XRE 190 é uma excelente escolha para deslocamentos urbanos, viagens curtas e trilhas leves, unindo praticidade, durabilidade e o espírito aventureiro característico da linha XRE.',
    3: 'A Yamaha MT-03 é uma naked bike esportiva com design agressivo. Seu motor 321cc oferece excelente desempenho e diversão nas curvas.',
    4: 'A Bajaj Dominar 400 é uma moto de alto desempenho, pensada para quem busca potência, tecnologia e estilo em um só veículo. Com motor monocilíndrico de 373,3cc, refrigeração líquida e 40 cavalos de potência, ela oferece aceleração rápida e torque constante, ideal tanto para o uso urbano quanto para viagens. Seu design imponente se destaca pelos faróis full LED, linhas agressivas e acabamento moderno. A suspensão dianteira invertida e os freios a disco com ABS nas duas rodas garantem mais segurança e controle, enquanto o painel digital completo facilita a leitura das informações durante a pilotagem. Robusta, confortável e equipada com recursos de motos de maior cilindrada, a Dominar 400 é uma escolha versátil para quem quer dominar qualquer caminho com confiança e atitude.',
    5: 'A BMW G 310 GS é uma moto aventureira de baixa cilindrada que combina o espírito das grandes GS com agilidade e versatilidade para o uso urbano e viagens. Equipada com motor monocilíndrico de 313cc, refrigeração líquida e injeção eletrônica, entrega 34 cavalos de potência e uma condução equilibrada, com boa resposta tanto em trechos asfaltados quanto em estradas de terra. Seu design imponente e típico da linha GS inclui para-brisa elevado, banco em dois níveis e carenagens robustas que reforçam o visual off-road. A posição de pilotagem é ereta e confortável, favorecendo longos trajetos, enquanto a suspensão com longo curso e rodas de 19" na dianteira garantem estabilidade e absorção de impactos em diferentes terrenos. Com freios ABS, embreagem assistida e painel digital, a G 310 GS oferece tecnologia, segurança e estilo em um pacote leve, acessível e pronto para explorar novos caminhos com a assinatura de qualidade da BMW Motorrad',
    6: 'A Triumph Tiger 1200 é uma maxitrail de alto desempenho projetada para quem busca explorar longas distâncias com conforto, potência e tecnologia de ponta. Equipada com um motor tricilíndrico de 1.160cc, ela entrega torque abundante e uma condução suave e envolvente, ideal tanto para o asfalto quanto para aventuras off-road. Seu chassi leve em alumínio, combinado com suspensões semiativas Showa e rodas raiadas (nas versões mais aventureiras), proporciona excelente controle e absorção de impactos em qualquer terreno. O pacote eletrônico avançado inclui controle de tração, modos de pilotagem, freios Brembo com ABS em curvas, quickshifter e painel TFT colorido com conectividade. O visual robusto e sofisticado reflete sua proposta premium, com acabamento refinado e ergonomia pensada para longas jornadas. A Tiger 1200 é uma verdadeira máquina de exploração, que une força, tecnologia e conforto para quem deseja ir mais longe com confiança e estilo.'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'] as MotoId;
      const motoEstoque = this.estoqueComponent.motos.find(m => m.id === id);
      
      if (motoEstoque) {
        this.moto = {
          ...motoEstoque,
          descricao: this.descricoes[id]
        };
      }
    });
  }
}
