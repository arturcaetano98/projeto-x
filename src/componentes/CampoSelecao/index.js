import "./CampoSelecao.css";

const CampoSelecao = (props) => {
    return (
        <div className="CampoSelecao-fundo">
            <label className="CampoSelecao-label">{props.campoSelecaoLabel}</label>
            <form>
                <select value={props.campoSelecaoValor} onChange={props.alteraCampo} className="CampoSelecao-select">
                    {
                        props.campoSelecaoValores.map((opcao) => <option key={opcao.toString()} value={opcao}>{opcao}</option>)
                    }
                </select>
            </form>
        </div>
    );
}

export default CampoSelecao;