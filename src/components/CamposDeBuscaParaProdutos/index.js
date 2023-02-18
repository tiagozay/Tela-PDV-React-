const CamposDeBuscaParaProdutos = ({
    codigoProdutoBuscado,
    aoDigitarCodigo,
    inputCodigoRef,
    aoClicarEmLimparCodigo,
    descricaoProdutoBuscado,
    aoDigitarDescricao,
    inputDescricaoRef,
    aoClicarEmLimparDescricao
}) => {
    return (
        <div id="campos-produto-venda">
            <div className="campo-codigo-de-barras">
                <div className="titulo-campo">Código do produto</div>
                <div id="campo-codigo-de-barras__divInput">
                    <input type="text" value={codigoProdutoBuscado} onChange={aoDigitarCodigo} id="input-codigo-de-barras-vender" ref={inputCodigoRef}/>
                    <button className="material-icons" onClick={aoClicarEmLimparCodigo}>clear</button>
                </div>
                
            </div>
            <div className="campo-descricao">
                <div className="titulo-campo">Descrição</div>
                <div id="campo-descricao__divInput">
                    <input value={descricaoProdutoBuscado} onChange={aoDigitarDescricao} type="text" id="input-descricao-venda" className="input_maiusculo"  ref={inputDescricaoRef} />
                    <button className="material-icons" onClick={aoClicarEmLimparDescricao}>clear</button>
                </div>
            </div>
        </div>
    );
}

export default CamposDeBuscaParaProdutos;