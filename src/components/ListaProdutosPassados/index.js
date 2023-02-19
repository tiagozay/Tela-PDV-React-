import ProdutoPassado from "../ProdutoPassado";

const ListaProdutosPassados = ({produtosPassados, aoDiminuirQuantidade, aoAumentarQuantidade, aoAlterarQuantidade,  aoRemoverProduto}) => {
    return (
        <div id="lista-de-produtos-passados">
          <div id="lista-de-produtos-passados__titulo">
              Lista de produtos
          </div>
          <div id="lista-de-produtos-passados__conteudo">
              <table id="lista-de-produtos-passados__tabela">
                  <thead>
                      <tr id="lista-de-produtos-passados__tabela__cabecalho">
                          <td id="lista-de-produtos-passados__tabela__cabecalho__codigo">Código</td>
                          <td id="lista-de-produtos-passados__tabela__cabecalho__descricao">Descrição</td>
                          <td id="lista-de-produtos-passados__tabela__cabecalho__un">UN</td>
                          <td id="lista-de-produtos-passados__tabela__cabecalho__qtde">Qtde</td>
                          <td id="lista-de-produtos-passados__tabela__cabecalho__vlunitario">Vl unitário</td>
                          <td id="lista-de-produtos-passados__tabela__cabecalho__total">Total</td>
                          <td id="lista-de-produtos-passados__tabela__cabecalho__acoes">Ações</td>
                      </tr>
                  </thead>

                  <tbody id="lista-de-produtos-passados__tabela__tbody">
                    {
                        produtosPassados.map( produto => 
                            <ProdutoPassado key={produto.id}
                                produto={produto}
                                aoDiminuirQuantidade={aoDiminuirQuantidade}
                                aoAumentarQuantidade={aoAumentarQuantidade}
                                aoAlterarQuantidade={aoAlterarQuantidade}
                                aoRemoverProduto={aoRemoverProduto}
                            />
                        )
                    }
                  </tbody>

              </table>
          </div>
      </div>
    )
}

export default ListaProdutosPassados;