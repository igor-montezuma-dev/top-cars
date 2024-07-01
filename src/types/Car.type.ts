export interface Car {
  modelo_id: any;
  nome_modelo: any;
  id: number;
  timestamp_cadastro: number;
  ano: number;
  combustivel: string;
  num_portas: number;
  cor: string;
  valor: number;
  //: Model;
}

export interface Model {
  id: number;
  nome: string;
  valor_fipe: number;
  brand: Brand;
}

export interface Brand {
  marca_id: number;
  nome_marca: string;
}W
