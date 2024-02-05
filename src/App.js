import './App.css';
import {useEffect, useState} from "react";
import FormCadastro from "./components/FormCadastro";
import "item-lista";

const PEDIDOS_MOCK = [
    {id: 1, label: "Sankhya", value: 1000},
    {id: 2, label: "Jiva", value: 950},
    {id: 3, label: "Amazon", value: 730},
    {id: 4, label: "Magalu", value: 1200},
];

function App() {
    const [pedidos, setPedidos] = useState([]);
    const [totalSelecionado, setTotalSelecionado] = useState(0);
    const [totalAprovado, setTotalAprovado] = useState(0);

    const body = document.querySelector("body");
    body.addEventListener("itemChecked", itemCheckedHandler);

    function itemCheckedHandler(e) {
        console.log("itemCheckedHandler")
        const item = e.detail;
        if(pedidos.filter(pedido => pedido.id == item.id).length > 0){
            atualizaTotalizadorSelecionados(item);
            atualizaPedidos(item);
        }
    }

    function atualizaTotalizadorSelecionados(item) {
        let value;
        if (item.checked) {
            value = totalSelecionado + item.value;
        } else {
            value = totalSelecionado - item.value;
        }
        setTotalSelecionado(value);
    }

    function atualizaPedidos(item) {
        setPedidos([...pedidos.map(pedido => {
            if (pedido.id != item.id) {
                return pedido;
            }
            return {...pedido, checked: item.checked}
        })]);
    }

    useEffect(() => {
        setPedidos([...PEDIDOS_MOCK]);

        return () => body.removeEventListener("itemChecked", itemCheckedHandler);
    }, []);


    function handleAddPedido(novoPedido) {
        setPedidos([...pedidos, novoPedido]);
    }

    function handleDelete(item) {
        console.log("handleDelete")
        setPedidos([...pedidos.filter(pedido => pedido.id != item.id)]);
    }

    function renderPedidos() {
        return pedidos.map(pedido => {
            return (
                <item-lista key={pedido.id}
                            id={pedido.id}
                            label={pedido.label}
                            value={pedido.value}
                            checked="false"
                >
                    <button onClick={() => handleDelete(pedido)}
                            className="btn-danger">
                        Excluir
                    </button>
                </item-lista>
            )
        })
    }


    function isApproveDisabled() {
        return pedidos.filter(pedido => pedido.checked === true).length < 1;
    }

    function handleAprovePedidos() {
        updateTotalAprovado();
        setPedidos([...pedidos.filter(pedido => !pedido.checked)]);
        setTotalSelecionado(0);
    }

    function updateTotalAprovado() {
        let total = totalAprovado;
        pedidos.forEach(pedido => {
            if (pedido.checked) {
                total = Number(total) + Number(pedido.value);
            }
        })
        setTotalAprovado(total);
    }

    return (
        <div className="App">
            <h1 className="header">Controle de faturamento</h1>
            <FormCadastro addPedidoCB={handleAddPedido}/>

            <div className="pedidos-container">{renderPedidos()}</div>

            <div className="footer">
                <div className="totalizador">
                    <span className="selecionado">Total <strong>Selecionado</strong>: {totalSelecionado}</span>
                    <span className="aprovado">Total <strong>Aprovado</strong>: {totalAprovado}</span>
                </div>
                <button disabled={isApproveDisabled()}
                        onClick={handleAprovePedidos}>
                    Aprovar Pedidos
                </button>
            </div>
        </div>
    );
}

export default App;
