import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./CriarCotacao.css";

import UsuarioContexto from "../../contextos/UsuarioContext";
import SeguradoContexto from "../../contextos/SeguradoContext";

import Botao from "../../componentes/Botao";
import CampoTexto from "../../componentes/CampoTexto";
import CampoNumerico from "../../componentes/CampoNumerico";
import CampoSelecao from "../../componentes/CampoSelecao";

import validaCPF from "../../utils/validaCadastroDePessoaFisica.js";

const CriarCotacao = () => {

    const { id, setId, nome, setNome } = useContext(UsuarioContexto);

    const navegate = useNavigate();

    const { idCot, setIdCot, nomeSeg, setNomeSeg,
        CPF, setCPF, terminoVig, setTerminoVig, 
        valorRisco, setValorRisco, cobertura, setCobertura,
        lista, setLista } = useContext(SeguradoContexto);

    const [info, setInfo] = useState("");

    const checaSegurado = (CPFAtual) => {
        if(validaCPF(CPFAtual)){
            const resultado = lista.filter(segurado => {
                return segurado.cpf_segurado === CPFAtual;
            });
            if(resultado.length === 0) {
                return [true, "Cadastrado com sucesso!"];
            }
            else {
                return [false, "O CPF já está cadastrado em nossa base!"];
            }   
        }
        else {
            return [false, "O CPF é inválido!"];
        }
    }
    
    const calculaDatas = () => {
        const dataAtual = new Date();
        dataAtual.setDate(dataAtual.getDate() + 1);
        const inicio = dataAtual.getDate()+"/"+(dataAtual.getMonth()+1)+"/"+dataAtual.getFullYear();
        dataAtual.setDate(dataAtual.getDate() + (parseInt(terminoVig) * 365.25));
        const fim = dataAtual.getDate()+"/"+(dataAtual.getMonth()+1)+"/"+dataAtual.getFullYear();
        return [inicio, fim];
    }

    const precoSeguro = (tipoCobertura, valorVeiculo) => {
        if(tipoCobertura === "Perda Total"){
            return 0.06 * valorVeiculo;
        }
        else if (tipoCobertura === "Incêndio"){
            return 0.04 * valorVeiculo;
        }
        else {
            return 0.05 * valorVeiculo;
        }
    }

    const realizaCotacao = (evento) => {

        evento.preventDefault();
        const datas = calculaDatas();
        const preco = precoSeguro(cobertura, valorRisco);
        const validacaoCPF = checaSegurado(CPF);

        if(validacaoCPF[0]){
            setIdCot(idCot+1);
            const linha = {
                n_cotacao: idCot,
                id_usuario: id,
                nome_segurado: nomeSeg,
                cpf_segurado: CPF,
                inicio_vigencia: datas[0],
                termino_vigencia: datas[1],
                valor_risco: parseFloat(valorRisco).toFixed(2),
                tipo_cobertura: cobertura,
                valor_seguro: parseFloat(preco).toFixed(2),
                proposta_efetivada: false
            };
            const dados = [];
            dados.push(...lista, linha);
            localStorage.setItem("lista", JSON.stringify(dados));
            setLista(dados);
            localStorage.setItem("idCot", idCot);
            toast.success(validacaoCPF[1]);
            limpaFormulario();
        }
        else {
            toast.error(validacaoCPF[1]);
        }
    }

    const limpaFormulario = () => {
        setNomeSeg("");
        setCPF("");
        setValorRisco("");
        setTerminoVig(5);
        setCobertura("Morte natural");
    }

    const deslogarUsuario = () => {
        localStorage.removeItem("usuarioLogado");
    }

    useEffect(() => {
        if(cobertura === "Morte natural"){
            setInfo("Cobertura em caso de morte por algum problema fisiológico");
        }
        else if (cobertura === "Morte acidental"){
            setInfo("Cobertura em caso de morte por lesões causadas por um acidente");
        }
        else if (cobertura === "Invalidez") {
            setInfo("Cobertura em caso de lesões que causem invalidez permanente no contratante");
        }
    }, [cobertura]);

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

    return(
        <div>
            <p className="CriarCotacao-saudacoes">Olá {nome}, <Link className="CriarCotacao-sair" to="/" onClick={() => deslogarUsuario()}>Sair</Link></p>
            <div className="CriarCotacao-formulario">
                <form onSubmit={realizaCotacao}>
                    <h2 className="Login-titulo">Nova Cotação</h2>
                        <ToastContainer />
                        <CampoTexto
                            campoTextoLabel="Nome:"
                            campoTextoRequired={true}
                            campoTextoType="text"
                            campoTextoPlaceholder="Digite o nome do segurado"
                            campoTextoValue={nomeSeg}
                            campoTextoMaxLength={45}
                            alteraCampo={valorCampo => {
                                setNomeSeg(valorCampo);
                            }}
                        />
                        <CampoNumerico
                            campoNumericoLabel="CPF (apenas números):"
                            campoNumericoRequired={true}
                            campoNumericoPlaceholder="Digite o CPF do segurado"
                            campoNumericoValue={CPF}
                            campoNumericoMin={0}
                            campoNumericoMax={99999999999}
                            alteraCampo={valorCampo => setCPF(valorCampo)}
                        />
                        <CampoSelecao
                            campoSelecaoLabel="Término de vigência (em anos):"
                            campoSelecaoValores={[5, 6, 7, 8, 9, 10]}
                            campoSelecaoValor={terminoVig}
                            alteraCampo={evento => setTerminoVig(evento.target.value)}
                        />
                        <CampoNumerico
                            campoNumericoLabel="Valor em risco (apenas números):"
                            campoNumericoRequired={true}
                            campoNumericoPlaceholder="Digite o valor em risco"
                            campoNumericoValue={valorRisco}
                            campoNumericoMin={5000.00}
                            campoNumericoMax={1000000.00}
                            alteraCampo={valorCampo => setValorRisco(valorCampo)}
                        />
                        <CampoSelecao
                            campoSelecaoLabel="Tipo de cobertura:"
                            campoSelecaoValores={["Morte natural", "Morte acidental", "Invalidez"]}
                            campoSelecaoValor={cobertura}
                            alteraCampo={evento => setCobertura(evento.target.value)}
                        />
                        <div className="CriarCotacao-informacaoCotacao"><label>Detalhes sobre a cobertura:</label> {info}</div>
                        {
                            nomeSeg.length !== 0 && CPF > 0 && valorRisco > 0
                            &&
                            <Botao
                                botaoOnClick={() => realizaCotacao}
                                botaoTexto="Elaborar proposta"
                            />
                        }
                        <Link className="CriarCotacao-voltar" to="/menuUsuario" onClick={() => limpaFormulario()}>
                            Voltar
                        </Link>
                </form>
            </div>
        </div>
    );
}

export default CriarCotacao;