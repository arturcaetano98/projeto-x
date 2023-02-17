import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Apolice.css";

import UsuarioContexto from "../../contextos/UsuarioContext";
import SeguradoContexto from "../../contextos/SeguradoContext";

const Apolice = () => {

    const { state } = useLocation();

    const { setId, nome, setNome } = useContext(UsuarioContexto);
    const { idCot, setIdCot, lista, setLista } = useContext(SeguradoContexto);

    const navegate = useNavigate();

    let listaApolices = lista;
    const apolice = listaApolices.filter(itemLista => itemLista.n_cotacao === parseInt(state));

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
            <p className="Apolice-saudacoes">Olá {nome}, <Link className="Apolice-sair" to="/" onClick={() => deslogarUsuario()}>Sair</Link></p>
                <div className="Apolice-formulario">
                    <h1 class="Apolice-titulo">Apólice número: {apolice[0]?.n_cotacao}</h1>
                    <div class="Apolice-informacao">
                        <p class="Apolice-texto">
                            A <div className="Apolice-enfase">Seguradora X</div>, registrada sob o CPNJ<div className="Apolice-enfase"> 00.000.00/0000-00</div>, tem como responsabilidade 
                            assegurar <div className="Apolice-enfase">{apolice[0]?.nome_segurado.toUpperCase()}</div>, portador do CPF<div className="Apolice-enfase"> {apolice[0]?.cpf_segurado}</div>, 
                            em um período que corresponde de <div className="Apolice-enfase">{apolice[0]?.inicio_vigencia}</div> à <div className="Apolice-enfase">{apolice[0]?.termino_vigencia}</div>.
                            Como responsável pelo <div className="Apolice-enfase"> Seguro X</div>, registrado na apólice <div className="Apolice-enfase"> {apolice[0]?.n_cotacao}</div>, a mesma se 
                            compromete em <div className="Apolice-enfase">INDENIZAR</div> o contratante do <div className="Apolice-enfase">SEGURO DE VIDA</div>, com um valor corresponde à 
                            <div className="Apolice-enfase"> R${apolice[0]?.valor_risco} </div> contra danos de natureza similares a <div className="Apolice-enfase"> {apolice[0]?.tipo_cobertura.toUpperCase()}</div>.
                        </p>
                    </div>
                <Link className="Apolice-sair" to="/listarApolices">Voltar</Link>
            </div>
        </div>
    );
}

export default Apolice;