import "./CampoTexto.css";

const CampoTexto = (props) => {
    
    const campoOnChange = (evento) => {
        props.alteraCampo(evento.target.value); 
    }

    return (
        <div className="CampoTexto-fundo">
            <label className="CampoTexto-label">{props.campoTextoLabel}</label>
            <input
                className="CampoTexto-input"
                required={props.campoTextoRequired}
                type={props.campoTextoType}
                placeholder={props.campoTextoPlaceholder}
                value={props.campoTextoValue}
                maxLength={props.campoTextoMaxLength}
                onChange={campoOnChange}
            />
        </div>
    );
}

export default CampoTexto;