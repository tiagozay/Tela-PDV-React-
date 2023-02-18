const InformacoesFinaisDaVenda = ({venda, aoDigitarDesconto, aoDigitarValorPago, aoClicarEmCancelarVenda, aoClicarEmFinalizarVenda}) => {
    return (
        <div id="informacoes-finais-da-venda">
            <div id="informacoes-finais-da-venda__campos">
                <div id="soma-total-da-venda" className="informacoes-finais-da-venda__campo">
                    <div id="soma-total-da-venda__titulo" className="informacoes-finais-da-venda__titulos-dos-campos">
                        Total
                    </div>
                    <div id="soma-total-da-venda__valor" className="informacoes-finais-da-venda__valores">
                        {venda.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>

                <div id="soma-total-da-venda-com-desconto" className="informacoes-finais-da-venda__campo">
                    <div id="soma-total-da-venda-com-desconto__titulo" className="informacoes-finais-da-venda__titulos-dos-campos">
                        Total com desconto
                    </div>
                    <div id="soma-total-da-venda-com-desconto__valor" className="informacoes-finais-da-venda__valores">
                    {venda.totalComDesconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>

                <div id="desconto-da-venda" className="informacoes-finais-da-venda__campo">
                    <div id="desconto-da-venda__titulo" className="informacoes-finais-da-venda__titulos-dos-campos">
                        Desconto
                    </div>

                    <input 
                    type="text" 
                    value={venda.desconto} onChange={aoDigitarDesconto} 
                    id="input-desconto-da-venda__valor" 
                    className="campo-venda-que-recebe-informacoes informacoes-finais-da-venda__valores"
                    />
                </div>

                <div id="valor-pago-na-venda" className="informacoes-finais-da-venda__campo">
                    <div id="valor-pago-na-venda-venda__titulo"
                        className="informacoes-finais-da-venda__titulos-dos-campos">
                        Valor pago
                    </div>
                    <input type="text" value={venda.valorPago} onChange={aoDigitarValorPago} id="input-valor-pago-da-venda__valor" className="campo-venda-que-recebe-informacoes informacoes-finais-da-venda__valores"/>
                </div>

                <div id="troco-da-venda" className="informacoes-finais-da-venda__campo">
                    <div id="troco-da-venda-venda__titulo" className="informacoes-finais-da-venda__titulos-dos-campos">
                        Troco
                    </div>
                    <div id="troco-da-venda__valor" className="informacoes-finais-da-venda__valores opacidade-04">
                        {venda.troco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>
            </div>

            <div id="informacoes-finais-da-venda__botoes">
                        
                <button id="informacoes-finais-da-venda__BtnCancelarVenda" className="opacidade informacoes-finais-da-venda__btn" onClick={aoClicarEmCancelarVenda} >
                    Cancelar venda 
                    <i className="material-icons">delete</i>
                </button>

                <button id="informacoes-finais-da-venda__BtnFinalizarVenda" className="opacidade informacoes-finais-da-venda__btn" onClick={aoClicarEmFinalizarVenda}>
                    Finalizar venda 
                    <i className="material-icons" id="icone_finalizar_venda">payments</i>               
                </button>
            
            </div>
    </div>
    );
}

export default InformacoesFinaisDaVenda;