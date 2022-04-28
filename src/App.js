import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "../src/store/";
import { Provider } from "react-redux";

import Login from "./view/login//index";
import UsuarioNovo from "./view/usuario_novo/index";
import Home from "./view/home";
import RecuperarSenha from "./view/recuperar_senha/index";
import EventoCadastro from "./view/evento_cadastro";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/usuario_novo" element={<UsuarioNovo />} />
                    <Route
                        path="/recuperar_senha"
                        element={<RecuperarSenha />}
                    />
                    <Route
                        path="/eventosCadastro"
                        element={<EventoCadastro />}
                    />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
