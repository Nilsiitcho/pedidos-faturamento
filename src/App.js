import './App.css';
import {useEffect, useState} from "react";
import FormCadastro from "./components/FormCadastro";
import "item-lista";

const PEDIDOS_MOCK = [
    {id: 1, label: "Sankhya", value: 1000},
    {id: 2, label: "Jiva", value: 950},
    {id: 3, label: "Amazon", value: 730},
    {id: 4, label: "Magalu", value: 1200},
]

function App() {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        setPedidos([...PEDIDOS_MOCK]);
    }, []);

    function handleAddPedido(novoPedido){
        setPedidos([...pedidos, novoPedido]);
    }

    return (
        <div className="App">
            <h1 className="header">Controle de faturamento</h1>

            <FormCadastro addPedidoCB={handleAddPedido}/>

            <div className="pedidos-container">
                {pedidos.map(pedido => {
                    return (
                        <item-lista id={Date.now()} label={pedido.label} value={1500.99} checked="false"></item-lista>
                    )
                })}
            </div>
        </div>
    );
}

export default App;
