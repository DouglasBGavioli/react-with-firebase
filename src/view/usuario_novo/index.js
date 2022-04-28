import React, { useState } from "react";
import { firebase } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./usuario_novo.css";
import Navbar from "../../components/navbar";

export default function Usuario_novo() {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState(false);

    function cadastrar() {
        setCarregando(true);
        setMsgTipo(null);
        if (!email || !senha) {
            setMsgTipo("erro");
            setCarregando(false);
            setMsg("Você precisa informar o email e senha!");
            return;
        }
        createUserWithEmailAndPassword(firebase, email, senha)
            .then((resposta) => {
                setMsgTipo("sucesso");
                setCarregando(false);
            })
            .catch((error) => {
                setCarregando(false);
                setMsgTipo("erro");
                console.log(error);
                console.log(error.message);
                switch (error.message) {
                    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                        setMsg("A senha deve ter pelo menos 6 caracteres");
                        break;
                    case "Firebase: Error (auth/email-already-in-use).":
                        setMsg("Este email ja esta cadastrado!");
                        break;
                    case "Firebase: Error (auth/invalid-email).":
                        setMsg("O formato do seu email é invalido");
                        break;
                    default:
                        setMsg(
                            "Não foi possivel cadastrar. Tente novamente mais tarde!"
                        );
                        break;
                }
            });
    }

    return (
        <>
            <Navbar />
            <div className="form-cadastro">
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mb-3 text-black fw-bold">Cadastro</h1>
                    <input
                        type="email"
                        className="form-control my-2"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control my-2"
                        placeholder="Senha"
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    {carregando ? (
                        <div
                            className="spinner-border text-danger"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <button
                            onClick={cadastrar}
                            type="button"
                            className="btn btn-lgbtn-block mt-3 mb-5 btn-cadastro"
                        >
                            Cadastrar
                        </button>
                    )}

                    <div className="msg-login text-black text-center my-2">
                        {msgTipo === "sucesso" && (
                            <span>
                                <strong>WoW! </strong> Usuário cadastrado com
                                sucesso! &#128526;
                            </span>
                        )}
                        {msgTipo === "erro" && (
                            <span>
                                <strong>Ops! </strong> {msg} &#128546;
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
