import "./Login.css";

import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import CampoTexto from "../../componentes/CampoTexto";
import Botao from "../../componentes/Botao";

import UsuarioContexto from "../../contextos/UsuarioContext";
import SeguradoContext from "../../contextos/SeguradoContext";

const Login = () => {

    const navegate = useNavigate();

    const conta = ["Artur", "artur123", "teste123", 100];

    const { setId, setNome, username, setUsername, senha, setSenha } = useContext(UsuarioContexto);
    const { idCot, setIdCot, lista, setLista} = useContext(SeguradoContext); // Para inicializar 

    const loginSubmit = (evento) => {
        evento.preventDefault();
        if((username === conta[1] && senha === conta[2])){
            navegate("/menuUsuario");
            setNome(conta[0]);
            setUsername("");
            setSenha("");
            setId(conta[3]);
            localStorage.setItem("usuarioLogado", "OK");
            localStorage.setItem("usuarioId", conta[3]);
            localStorage.setItem("usuarioNome", conta[0]);
        }
        else {
            toast.error("Username ou senha inválidos!!!!!");
        }
    }

    useEffect(() => {
        if(localStorage.getItem("usuarioLogado") === "OK") {
            setId(localStorage.getItem("usuarioId"));
            setNome(localStorage.getItem("usuarioNome"));
            navegate("/menuUsuario");

            if(lista.length === 0 || lista === null){ // Recuperando "lista"
                setLista(JSON.parse(localStorage.getItem("lista")) ? JSON.parse(localStorage.getItem("lista")) : []);
            }
            if(idCot === 0 || idCot === null){ // Recuperando "n_cotacao"
                setIdCot(parseInt(localStorage.getItem("idCot")) ? parseInt(localStorage.getItem("idCot")) + 1 : 0);
            }
        }
        else {
            toast.warning("Realize o Login para entrar!");
        }
    }, []);
    
    return(
        <div className="Login-formulario">
            <form onSubmit={loginSubmit}>
                <h2 className="Login-titulo">Login</h2>
                    <ToastContainer />
                    <CampoTexto
                        campoTextoLabel="Username:"
                        campoTextoRequired={true}
                        campoTextoType="text"
                        campoTextoPlaceholder="Digite o username"
                        campoTextoValue={username}
                        campoTextoMaxLength={45}
                        alteraCampo={valorCampo => {
                            setUsername(valorCampo);
                        }}
                    />
                    <CampoTexto
                        campoTextoLabel="Senha:"
                        campoTextoRequired={true}
                        campoTextoType="password"
                        campoTextoPlaceholder="Digite a senha"
                        campoTextoValue={senha}
                        campoTextoMaxLength={18}
                        alteraCampo={valorCampo => {
                            setSenha(valorCampo);
                        }}
                    />
                    <Botao
                        botaoOnClick={() => loginSubmit}
                        botaoTexto="Login"
                    />
            </form>
        </div>
    );
}

export default Login;