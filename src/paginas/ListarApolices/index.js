import { useState, useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

import "./ListarApolices.css";

import CampoSelecao from "../../componentes/CampoSelecao";

import UsuarioContexto from "../../contextos/UsuarioContext";
import SeguradoContexto from "../../contextos/SeguradoContext";

const ListarApolices = () => {

    const navegate = useNavigate();

    const { id, setId, nome, setNome } = useContext(UsuarioContexto);
    const { idCot, setIdCot, lista, setLista } = useContext(SeguradoContexto);

    const [ordenacao, setOrdenacao] = useState("Menor apólice");

    const header = [ "Nº Apólice", "Nome Segurado", "CPF", "Inicio Vigência", "Termino Vigência", "Valor do Risco (R$)", "Cobertura", "Valor seguro (R$)", "Informações"];
    let valores = lista?.filter(item => (item.proposta_efetivada === true) && (item.id_usuario === id));

    const exibirApolice = (evento, n_cotacao) => {
        evento.preventDefault();
        navegate("/apolice", { state: n_cotacao.toString() });
    }

    const deslogarUsuario = () => {
        localStorage.removeItem("usuarioLogado");
    }

    useEffect(() => {
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
            <p className="ListarApolices-saudacoes">Olá {nome}, <Link className="ListarApolices-sair" to="/" onClick={() => deslogarUsuario()}>Sair</Link></p>
            <div className="ListarApolices-lista">
                <h1 className="ListarApolices-titulo">Listando as apólices</h1>
                {
                    valores.length === 0 ? 
                    <p className="ListarApolices-mensagemRegistro"> Nenhuma apólice foi encontrada</p> :
                    <div>
                        <div className="ListarApolices-ordenacao">
                            <CampoSelecao
                                campoSelecaoValores={["Menor apólice", "Maior apólice"]}
                                campoSelecaoValor={ordenacao}
                                alteraCampo={evento => setOrdenacao(evento.target.value)}
                            />
                        </div>
                        <table className="ListarApolices-tabela">
                            <thead className="ListarApolices-cabecalho">
                                <tr>
                                    {header?.map((headerItem, index) => 
                                    (<th className="ListarApolices-coluna" key={index}>{headerItem}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {valores?.sort((a, b) => {return (ordenacao === "Menor apólice" ? a.n_cotacao - b.n_cotacao : b.n_cotacao - a.n_cotacao)}
                                )?.map((valorItem, index) =>
                                    (<tr className="ListarApolices-linha" key={index}>
                                        <td className="ListarApolices-valor">{valorItem.n_cotacao}</td>
                                        <td className="ListarApolices-valor">{valorItem.nome_segurado}</td>
                                        <td className="ListarApolices-valor">{valorItem.cpf_segurado}</td>
                                        <td className="ListarApolices-valor">{valorItem.inicio_vigencia}</td>
                                        <td className="ListarApolices-valor">{valorItem.termino_vigencia}</td>
                                        <td className="ListarApolices-valor">{valorItem.valor_risco}</td>
                                        <td className="ListarApolices-valor">{valorItem.tipo_cobertura}</td>
                                        <td className="ListarApolices-valor">{valorItem.valor_seguro}</td>
                                        <td className="ListarApolices-valor">
                                            <Link 
                                                className="ListarApolices-exibirApolice" 
                                                to="" 
                                                onClick={(evento) => exibirApolice(evento, valorItem.n_cotacao)}
                                            >
                                                ver apólice
                                            </Link>
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                }
                <Link className="ListarApolices-voltar" to="/menuUsuario">Voltar</Link>
            </div>
        </div>
    );
}

export default ListarApolices;