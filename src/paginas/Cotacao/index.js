import { useContext, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./Cotacao.css";

import Botao from "../../componentes/Botao";

import UsuarioContexto from "../../contextos/UsuarioContext";
import SeguradoContexto from "../../contextos/SeguradoContext";

const Cotacao = () => {

    const { state } = useLocation();

    const { setId, nome, setNome } = useContext(UsuarioContexto);
    const { idCot, setIdCot, lista, setLista } = useContext(SeguradoContexto);

    const navegate = useNavigate();

    let listaCotacoes = lista;
    const cotacao = listaCotacoes.filter(itemLista => itemLista.n_cotacao === parseInt(state));

    const efetivaProposta = (evento) => {
        evento.preventDefault();
        const outrosItens = listaCotacoes.filter(itemLista => itemLista.n_cotacao !== parseInt(state));
        cotacao[0].proposta_efetivada = true;
        setLista([...outrosItens, cotacao[0]]);
        localStorage.setItem("lista", JSON.stringify(lista));
        toast.success(`Proposta do(a) ${cotacao[0].nome_segurado} efetivada com sucesso!`);
    }

    const deslogarUsuario = () => {
        localStorage.removeItem("usuarioLogado");
    }

    useEffect(() => {
        if(state === null){
            navegate("/menuUsuario");
        }

        // Verificando o Login
        if(localStorage.getItem("usuarioLogado") === "OK") {
            setId(localStorage.getItem("usuarioId"));
            setNome(localStorage.getItem("usuarioNome"));

            if(lista.length === 0 || lista === null){ // Recuperando "lista"
                setLista(JSON.parse(localStorage.getItem("lista")) ? JSON.parse(localStorage.getItem("lista")) : []);
                console.log(localStorage.getItem("lista"));
            }
            if(idCot === 0 || idCot === null){ // Recuperando "n_cotacao"
                setIdCot(parseInt(localStorage.getItem("idCot")) ? parseInt(localStorage.getItem("idCot")) + 1 : 0);
            }
        }
        else {
            navegate("/");
        }
    }, []);

    return (
        <div>
            <p className="Cotacao-saudacoes">Olá {nome}, <Link className="Cotacao-sair" to="/" onClick={() => deslogarUsuario()}>Sair</Link></p>
            <div className="Cotacao-formulario">
                <h1 class="Cotacao-titulo">Cotação número: {cotacao[0]?.n_cotacao}</h1>
                <ToastContainer />
                <div class="Cotacao-informacao"><label>Nome do segurado:</label> {cotacao[0]?.nome_segurado}</div>
                <div class="Cotacao-informacao"><label>CPF:</label> {cotacao[0]?.cpf_segurado}</div>
                <div class="Cotacao-informacao"><label>Início de vigência:</label> {cotacao[0]?.inicio_vigencia}</div>
                <div class="Cotacao-informacao"><label>Termino de vigência:</label> {cotacao[0]?.termino_vigencia}</div>
                <div class="Cotacao-informacao"><label>Valor do Risco (R$):</label> {cotacao[0]?.valor_risco}</div>
                <div class="Cotacao-informacao"><label>Tipo de Cobertura:</label> {cotacao[0]?.tipo_cobertura}</div>
                <div class="Cotacao-informacao"><label>Valor anual do seguro (R$):</label> {cotacao[0]?.valor_seguro}</div>
                <Botao
                    botaoOnClick={(evento) => efetivaProposta(evento)}
                    botaoTexto="Efetivar proposta"
                />
                <Link className="Cotacao-sair" to="/listarCotacoes">Voltar</Link>
            </div>
        </div>
    );
}

export default Cotacao;