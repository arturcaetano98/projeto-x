import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./reset.css";

import Navbar from "./componentes/Navbar";

import Erro from "./paginas/Erro";
import Login from "./paginas/Login";
import MenuUsuario from "./paginas/MenuUsuario";
import CriarCotacao from "./paginas/CriarCotacao";
import ListarCotacoes from "./paginas/ListarCotacoes";
import ListarApolices from "./paginas/ListarApolices";
import Cotacao from "./paginas/Cotacao";
import Apolice from "./paginas/Apolice";

// Criando o contexto para "Abraçar as paginas com os dados"
import UsuarioContexto from "./contextos/UsuarioContext";
import SeguradoContexto from "./contextos/SeguradoContext";

function App() {

  // Os "States" do Contexto de Login
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [id, setId] = useState(0);

  // Os "States" do contexto de Cotação
  const [idCot, setIdCot] = useState(0);
  const [nomeSeg, setNomeSeg] = useState("");
  const [CPF, setCPF] = useState("");
  const [terminoVig, setTerminoVig] = useState(5);
  const [valorRisco, setValorRisco] = useState("");
  const [cobertura, setCobertura] = useState("Morte natural");

  // Lista de registros
  const [lista, setLista] = useState([]);

  return (
    <div className="App">
      <UsuarioContexto.Provider value={{ id, setId, nome, setNome, username, setUsername, senha, setSenha }}>
        <SeguradoContexto.Provider value={{ idCot, setIdCot, nomeSeg, setNomeSeg, CPF, setCPF, terminoVig, setTerminoVig, valorRisco, cobertura, setCobertura, setValorRisco, lista, setLista}}>
          <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/menuUsuario" element={<MenuUsuario />} />
                <Route path="/criarCotacao" element={<CriarCotacao />} />
                <Route path="/listarCotacoes" element={<ListarCotacoes />} />
                <Route path="/listarApolices" element={<ListarApolices />} />
                <Route path="/cotacao" element={<Cotacao />} />
                <Route path="/apolice" element={<Apolice />} />
                <Route path="*" element={<Erro />} />
              </Routes>
          </BrowserRouter>
        </SeguradoContexto.Provider>
      </UsuarioContexto.Provider>
    </div>
  );
}

export default App;
