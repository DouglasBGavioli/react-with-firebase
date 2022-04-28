import React, { useState } from "react";
import "./login.css";
// eslint-disable-next-line no-unused-vars
import { firebase } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

export default function Login() {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logar() {
        signInWithEmailAndPassword(firebase, email, senha)
            .then((resposta) => {
                setMsgTipo("sucesso");
                setTimeout(() => {
                    dispatch({ type: "LOG_IN", usuarioEmail: email });
                    navigate("/");
                }, 800);
            })
            .catch((error) => {
                setMsgTipo("erro");
            });
    }

    return (
        <div className="login-content d-flex align-items-center">
            <form className="form-signin mx-auto">
                <h1 className="h3 mb-3 fw-normal text-white fw-bold text-center">
                    Login
                </h1>{" "}
                <input
                    type="email"
                    className="form-control my-2"
                    id="floatingInput"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control my-2"
                    id="floatingPassword"
                    placeholder="Senha"
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button
                    onClick={logar}
                    className="w-100 btn btn-lg btn-login"
                    type="button"
                >
                    Logar
                </button>
                <div className="msg-login text-white text-center  my-4 ">
                    {msgTipo === "sucesso" && (
                        <span>
                            <strong>WoW! </strong> Voce está conectado &#128526;
                        </span>
                    )}
                    {msgTipo === "erro" && (
                        <span>
                            <strong>Ops! </strong> Verifique se a senha ou
                            usuario estao corretos &#128546;
                        </span>
                    )}
                </div>
                <div className="opcoes-login mt-5 text-center">
                    <Link to="/recuperar_senha" className="mx-2">
                        Recuperar senha
                    </Link>
                    <span className="divisoria"></span>
                    <Link to="/usuario_novo" className="mx-2">
                        Quero me cadastrar
                    </Link>
                </div>
            </form>
        </div>
    );
}
