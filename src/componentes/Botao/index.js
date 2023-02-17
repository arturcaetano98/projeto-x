import "./Botao.css";

const Botao = (props) => {
    return (
        <div class="Botao-fundo">
            <button className="Botao" onClick={props.botaoOnClick}>{props.botaoTexto}</button>
        </div>
    );
}

export default Botao;