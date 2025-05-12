import { CadastroComponent } from './../pages/cadastro/cadastro.component';
import { EstoqueComponent } from './../pages/estoque/estoque.component';
import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { DescProdutosComponent } from '../pages/desc-produtos/desc-produtos.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },

  {
    path: "estoque",
    component: EstoqueComponent
  },

  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "desc-produtos/:id",
    component: DescProdutosComponent
  },

  {
    path: "cadastro",
    component: CadastroComponent
  },

];
