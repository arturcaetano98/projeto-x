import "./CampoNumerico.css";

const CampoNumerico = (props) => {

    const campoOnChange = (evento) => {
        props.alteraCampo(evento.target.value); 
    }

    return (
        <div className="CampoNumerico-fundo">
            <label className="CampoNumerico-label">{props.campoNumericoLabel}</label>
            <input
                className="CampoNumerico-input"
                required={props.campoNumericoRequired}
                type="number"
                placeholder={props.campoNumericoPlaceholder}
                value={props.campoNumericoValue}
                min={props.campoNumericoMin}
                max={props.campoNumericoMax}
                onChange={campoOnChange}
            />
        </div>
    );
}

export default CampoNumerico;