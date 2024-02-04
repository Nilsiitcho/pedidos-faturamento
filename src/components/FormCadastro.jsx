import "./FormCadastro.css"
import {useState} from "react";

function FormCadastro({addPedidoCB}) {
    const [label, setlabel] = useState("");
    const [value, setValue] = useState("");

    function addPedido(){
        if(!addPedidoCB){
            window.alert("Callback para adicionar pedido, não informado.")
            return;
        }
        addPedidoCB({id: Date.now(), label, value});
        setlabel("");
        setValue("");
    }

    function isDisabled(){
        return label?.length < 3 || !value;
    }

    return (
        <div className="cadastro-container">
            <input placeholder="Titulo" value={label}
                   onChange={e => setlabel(e.target.value)}/>

            <input placeholder="Valor" type="number"
                   value={value} min={0}
                   onChange={e => setValue(e.target.value)}/>

            <button onClick={addPedido}
                disabled={isDisabled()}>Cadastrar</button>
        </div>
    );
}

export default FormCadastro;
