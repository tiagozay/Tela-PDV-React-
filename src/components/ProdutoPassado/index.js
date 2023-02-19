import { Fragment, useState } from "react"

const ProdutoPassado = ({produto, aoDiminuirQuantidade, aoAumentarQuantidade, aoAlterarQuantidade,  aoRemoverProduto}) => {

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

    function clickTeclaFormulario(event)
    {
        if(event.key === "Escape"){
            setFormularioQtdeAberto(false);
        }
    }

    function cofirmarModificacaoDeQtde(event)
    {
        event.preventDefault();

        aoAlterarQuantidade(event.target.dataset.id, quantidadeModificada);
        setFormularioQtdeAberto(false);
    }

    return (
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
    );
}

export default ProdutoPassado;