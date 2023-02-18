const ListaDeProdutosEncontrados = ({produtosEncontrados, aoSelecionarProduto}) => {
    return (
        <div id="produtos-encontrados">
            <div id="produtos-encontrados__titulo">Produtos encontrados</div>
            <div id="produtos-encontrados__conteudo">
                <ul id="produtos-encontrados__produtos">
                {produtosEncontrados.map( produto => 
                    <li key={produto.id} className="produtos-encontrados__produto" onClick={() =>  aoSelecionarProduto(produto.id)}>
                        <div className="produto__codigo">{produto.codigo}</div>
                        <div className="produto__descricao">{produto.descricao}</div>
                        <div className="produto__un">{produto.un}</div>
                        <div className="produto__preco">{produto.valor}</div>
                        <div className="produto__quantidade-disponivel">{produto.qtdeDisponivel} disponíveis</div>
                    </li> 
                )}
                </ul>
            </div>
        </div>
    )
}

export default ListaDeProdutosEncontrados;