import { useEffect, useRef, useState } from "react";
import CamposDeBuscaParaProdutos from "./components/CamposDeBuscaParaProdutos";
import InformacoesFinaisDaVenda from "./components/InformacoesFinaisDaVenda";
import ListaDeProdutosEncontrados from "./components/ListaDeProdutosEncontrados";
import ListaProdutosPassados from "./components/ProdutosPassados";

const produtos = [
    {un: "UN", valor: 5.50, qtdeDisponivel: 20, "id":295, codigo:"7892840233945", descricao:"SALGADINHO FANDANGOS PRESUNTO"},
    {un: "UN", valor: 15.50, qtdeDisponivel: 20, "id":298, codigo:"7898043912113", descricao:"SORVETE FLOCOS SORVETES FROSTY POTE 1L"},
    {un: "UN", valor: 6.99, qtdeDisponivel: 20, "id":299, codigo:"7892840800079", descricao:"REFRIGERANTE PEPSI"},
    {un: "UN", valor: 5.50, qtdeDisponivel: 20, "id":290, codigo:"7892840221843", descricao:"SALGADINHO DORITOS QUEIJO NACHO"},
    {un: "UN", valor: 4.30, qtdeDisponivel: 20, "id":289, codigo:"7896019603430", descricao:"BIS LACTA CAIXA"},
    {un: "UN", valor: 12.90, qtdeDisponivel: 20, "id":209, codigo:"7898179370047", descricao:"ACUCAR CRISTAL CEDRO 5KG"},
    {un: "UN", valor: 9.75, qtdeDisponivel: 20, "id":159, codigo:"7898142865082", descricao:"CHOC TORTUGUITA 15,5G BRIGADEIRO"},
    {un: "UN", valor: 6.30, qtdeDisponivel: 20, "id":81, codigo:"7897453700136", descricao:"REFRIG RIO BRANCO GUARAN\u00c1 2L"},
    {un: "UN", valor: 4.25, qtdeDisponivel: 20, "id":82, codigo:"7897076023391", descricao:"LEITE COND BAO DE MINAS TP 395G"},
    {un: "UN", valor: 8.90, qtdeDisponivel: 20, "id":49, codigo:"7622300119652", descricao:"FERMENTO QU\u00cdMICO P\u00d3 ROYAL POTE 250G"},
    {un: "UN", valor: 3.30, qtdeDisponivel: 20, "id":50, codigo:"7896383300096", descricao:"VINAGRE DE ALCOOL CLARO"},
    {un: "UN", valor: 7.50, qtdeDisponivel: 20, "id":169, codigo:"7894900027013", descricao:"REFRIGERANTE COCA-COLA ORIGINAL GARRAFA 2L"},
];


class ProdutoPassado
{
    constructor(id, codigo, descricao, valor, un, qtde)
    {
        this.id = id;
        this.codigo = codigo;
        this.descricao = descricao;
        this.valor = valor;
        this.un = un;
        this.qtde = qtde;
        this.total = qtde * valor;
    }

    aumentarQuantidade(aumento) 
    {
        this.qtde += aumento;
        this.total = this.qtde * this.valor;
    }

    diminuirQuantidade(qtde) 
    {
        this.qtde -= qtde;
        this.total = this.qtde * this.valor;
    }

    alterarQuantidade(novaQuantidade)
    {
        this.qtde = Number(novaQuantidade);
        this.total = this.qtde * this.valor;
    }
}

function App() {    

    const [venda, setVenda] = useState({
        total: 0,
        totalComDesconto: 0,
        desconto: 0,
        valorPago: 0,
        troco: 0,
        produtosPassados: [],

        setDesconto(desconto)
        {
            this.desconto = desconto;
            this.calculaInformacoes();
            return {...this};
        },

        setValorPago(valorPago)
        {
            this.valorPago = valorPago;
            this.calculaInformacoes();
            return {...this};
        },

        calculaTotal()
        {
            this.total = this.produtosPassados.reduce( (acm, produto) => produto.total + acm, 0 );
        },

        calculaTotalComDesconto()
        {
            const total = this.produtosPassados.reduce( 
                (acm, produto) => produto.total + acm, 0 );

            this.totalComDesconto =  (total > 0) ? total - this.desconto : total;
        },

        calculaTroco()
        {
            if(!this.valorPago || this.valorPago <= this.totalComDesconto){
                this.troco = 0;
                return;
            }
            this.troco = this.valorPago - this.totalComDesconto;

        },

        calculaInformacoes()
        {
            this.calculaTotal();
            this.calculaTotalComDesconto(); 
            this.calculaTroco();
        },

        adicionarProduto(produtoPassado)
        {
            this.produtosPassados.push(produtoPassado);
            this.calculaInformacoes();
            return {...this};
        },

        aumentarQuantidadeDeProduto(id, aumento)
        {
            const produto = this.produtosPassados.find( produto => produto.id === id );
            produto.aumentarQuantidade(aumento);
            this.calculaInformacoes();
            return {...this};
        },

        diminuirQuantidadeDeProduto(id, debito)
        {
            const produto = this.produtosPassados.find( produto => produto.id === id );

            if(produto.qtde === 1){
                this.removerProduto(id);
            }else{
                produto.diminuirQuantidade(debito);
            }           
            this.calculaInformacoes();
            return {...this};
        },

        alterarQuantidadeDeProduto(id, novaQuantidade)
        {
            const produto = this.produtosPassados.find( produto => produto.id == id );
            produto.alterarQuantidade(novaQuantidade);
            this.calculaInformacoes();
            return {...this};
        },

        removerProduto(id)
        {
            this.produtosPassados = this.produtosPassados.filter( produto => produto.id !== id );
            this.calculaInformacoes();
            return {...this};

        },

        finalizar()
        {
            this.produtosPassados = [];
            this.calculaInformacoes();
            return {...this};
        }
    });

  const [produtosEncontradosNaBusca, setProdutosEncontradosNaBusca] = useState([]);
  const [codigoProdutoBuscado, setCodigoProdutoBuscado] = useState('');
  const [descricaoProdutoBuscado, setDescricaoProdutoBuscado] = useState('');

  const inputCodigoRef = useRef(null);
  const inputDescricaoRef = useRef(null);

  function aoClicarEmLimparCodigo()
  {
    setCodigoProdutoBuscado('');
    inputCodigoRef.current.focus();
  }

  function aoClicarEmLimparDescricao()
  {
    setDescricaoProdutoBuscado('');
    inputDescricaoRef.current.focus();
  }

  function aoClicarEmFinalizarVenda()
  {
    if(window.confirm("Deseja finalizar esta venda?")){
        setVenda(venda.finalizar());
        alert("Venda finalizada com sucesso!");
    }
  }

  function aoClicarEmCancelarVenda()
  {
    if(window.confirm("Deseja cancelar esta venda?")){
        setVenda(venda.finalizar());
        alert("Venda cancelada com sucesso!");
    }

  }

  function aoDigitarDesconto(event)
  { 
    let valorDigitado = event.target.value;

    setVenda(venda.setDesconto(valorDigitado));
  }

  function aoDigitarCodigo(event)
  {
    setCodigoProdutoBuscado(event.target.value);
    setDescricaoProdutoBuscado("");
  }

  function aoDigitarDescricao(event)
  {
    setDescricaoProdutoBuscado(event.target.value);
    setCodigoProdutoBuscado("");
  }

  function aoDigitarValorPago(event)
  {
    setVenda(venda.setValorPago(event.target.value));
  }

  function aoSelecionarProduto(id)
  {
    let produtoPassado = venda.produtosPassados.find( produto => produto.id === id );

    if(produtoPassado){
        setVenda(venda.aumentarQuantidadeDeProduto(id, 1));
    }else{
        const produtoProcurado = produtos.find( produto => produto.id === id );

        produtoPassado = new ProdutoPassado(
            produtoProcurado.id, 
            produtoProcurado.codigo, 
            produtoProcurado.descricao, 
            produtoProcurado.valor,
            produtoProcurado.un,
            1
        );

        setVenda(venda.adicionarProduto(produtoPassado));
    }

    setCodigoProdutoBuscado('');
    inputCodigoRef.current.focus();

  }

  function aoAumentarQuantidade(id)
  {
    setVenda(venda.aumentarQuantidadeDeProduto(id, 1));
  }

  function aoDiminuirQuantidade(id)
  {
    setVenda(venda.diminuirQuantidadeDeProduto(id, 1));
  }

  function aoAlterarQuantidade(id, novaQuantidade)
  {
    setVenda(venda.alterarQuantidadeDeProduto(id, novaQuantidade));
  }

  function aoRemoverProduto(id)
  {
    setVenda(venda.removerProduto(id));
  }

  useEffect(() => {
    if(codigoProdutoBuscado !== ''){
        const regex = new RegExp(codigoProdutoBuscado);
        const produtosEncontrados = produtos.filter( produto => regex.test(produto.codigo) );

        if(produtosEncontrados.length == 1 && codigoProdutoBuscado.length == 13){
            aoSelecionarProduto(produtosEncontrados[0].id);
        }

        setProdutosEncontradosNaBusca(produtosEncontrados);
        return;
    }
    setProdutosEncontradosNaBusca([]);
  }, [codigoProdutoBuscado]);

  useEffect(() => {
    if(descricaoProdutoBuscado !== ''){
        const regex = new RegExp(descricaoProdutoBuscado, 'i');
        const produtosEncontrados = produtos.filter( produto => regex.test(produto.descricao) );
        setProdutosEncontradosNaBusca(produtosEncontrados);
        return;
    }
    setProdutosEncontradosNaBusca([]);
  }, [descricaoProdutoBuscado]);


  return (
    <div className="App">
        <section className="secao" id="vender">
            <div id="informacoes-dos-produtos-a-serem-vendidos">
                <CamposDeBuscaParaProdutos
                    codigoProdutoBuscado={codigoProdutoBuscado}
                    aoDigitarCodigo={aoDigitarCodigo}
                    inputCodigoRef={inputCodigoRef}
                    aoClicarEmLimparCodigo={aoClicarEmLimparCodigo}
                    descricaoProdutoBuscado={descricaoProdutoBuscado}
                    aoDigitarDescricao={aoDigitarDescricao}
                    inputDescricaoRef={inputDescricaoRef}
                    aoClicarEmLimparDescricao={aoClicarEmLimparDescricao}
                />

                <ListaDeProdutosEncontrados 
                    produtosEncontrados={produtosEncontradosNaBusca} 
                    aoSelecionarProduto={aoSelecionarProduto}
                />
            </div>

            <ListaProdutosPassados 
                produtosPassados={venda.produtosPassados} 
                aoAumentarQuantidade={aoAumentarQuantidade} 
                aoDiminuirQuantidade={aoDiminuirQuantidade}
                aoAlterarQuantidade={aoAlterarQuantidade}
                aoRemoverProduto={aoRemoverProduto}
            />

            <InformacoesFinaisDaVenda
                venda={venda}
                aoDigitarDesconto={aoDigitarDesconto}
                aoDigitarValorPago={aoDigitarValorPago}
                aoClicarEmCancelarVenda={aoClicarEmCancelarVenda}
                aoClicarEmFinalizarVenda={aoClicarEmFinalizarVenda}
            />

        </section>
    </div>
);
}

export default App;
