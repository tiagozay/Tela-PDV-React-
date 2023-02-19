import { Fragment, useState } from "react"

const ListaProdutosPassados = ({produtosPassados, aoDiminuirQuantidade, aoAumentarQuantidade, aoAlterarQuantidade,  aoRemoverProduto}) => {

    const [formularioQtdeAberto, setFormularioQtdeAberto] = useState(false);

    const [quantidadeModificada, setQuantidadeModificada] = useState('');

    
    function aoDigitarQuantidade(event)
    {
        setQuantidadeModificada(event.target.value);        
    }

    function abrirFormDeEditarQtde(qtde)
    {
        setFormularioQtdeAberto(true);
        setQuantidadeModificada(qtde);
    }

    function cofirmarModificacaoDeQtde(event)
    {
        event.preventDefault();

        aoAlterarQuantidade(event.target.dataset.id, quantidadeModificada);
        setFormularioQtdeAberto(false);
    }

    function clickTeclaFormulario(event)
    {
        if(event.key === "Escape"){
            setFormularioQtdeAberto(false);
        }
    }

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
                        <tr className="lista-de-produtos-passados__tabela__produto" key={produto.id}>
                            <td className="lista-de-produtos-passados__tabela__produto__codigo">{produto.codigo}</td>
                            <td className="lista-de-produtos-passados__tabela__produto__descricao">{produto.descricao}</td>
                            <td className="lista-de-produtos-passados__tabela__produto__un">{produto.un}</td>
                            <td className="lista-de-produtos-passados__tabela__produto__qtde">
                                <div className="lista-de-produtos-passados__tabela__produto__divAlterar">
                                    {
                                        formularioQtdeAberto ?   
                                            <form 
                                                onSubmit={cofirmarModificacaoDeQtde}
                                                onKeyDown={clickTeclaFormulario} 
                                                data-id={produto.id}
                                                className="lista-de-produtos-passados__tabela__produto__qtde__form">
                                                <input 
                                                    value={ quantidadeModificada } 
                                                    onChange={aoDigitarQuantidade} 
                                                    name="nova_quantidade" 
                                                    type="number" className="lista-de-produtos-passados__tabela__produto__qtde_input-alterar" 
                                                    step="any" 
                                                    autoFocus={true}
                                                />
                                                <button className="lista-de-produtos-passados__tabela__produto__qtde_btn-confirmar material-icons">check</button>
                                            </form>

                                            :
                                            <Fragment>
                                                <span className="lista-de-produtos-passados__tabela__produto__qtde__span-quantidade">{produto.qtde}</span>

                                                <button onClick={ () => abrirFormDeEditarQtde(produto.qtde)} className="lista-de-produtos-passados__tabela__produto__qtde__btn-abrir-form material-icons">edit</button>
                                            </Fragment>
                                           
                                    }
                              
                                </div>
                                
                            </td>
                            <td className="lista-de-produtos-passados__tabela__produto__vlunitario">
                                {produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            <td className="lista-de-produtos-passados__tabela__produto__vltotal">
                                {produto.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            <td className="lista-de-produtos-passados__tabela__produto__acoes">
                                <button id="lista-de-produtos-passados__tabela__produto__btn-remover" className="material-icons btn-produto-passado" onClick={() => {aoRemoverProduto(produto.id)}}>delete</button>
            
                                <button id="lista-de-produtos-passados__tabela__produto__btn-diminuir" className="material-icons btn-produto-passado" onClick={() => {aoDiminuirQuantidade(produto.id)}}>remove</button>
            
                                <button id="lista-de-produtos-passados__tabela__produto__btn-aumentar" className="material-icons btn-produto-passado" onClick={() => {aoAumentarQuantidade(produto.id)}}>add</button>
            
                            </td>
                        </tr>
                      )
                    }
                  </tbody>

              </table>
          </div>
      </div>
    )
}

export default ListaProdutosPassados;