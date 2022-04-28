import React, { useState } from "react";
import "./recuperar_senha.css";

import { firebase } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Navbar from "../../components/navbar";

export default function RecuperarSenha() {
    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha() {
        sendPasswordResetEmail(firebase, email)
            .then((resultado) => {
                setMsg("Enviamos um link no email para redefinir sua senha!");
            })
            .catch((erro) => {
                setMsg("Verifique se o email esta correto");
            });
    }

    return (
        <>
            <Navbar />
            <form className="text-center form-login mx-auto mt-5">
                <h3 className="mb-3 fw-bold">Recuperar senha</h3>
                <input
                    type="email"
                    className="form-control my-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="msg my-4 text-center">
                    <span>{msg}</span>
                </div>
                <button
                    type="button"
                    className="btn btn-lg btn-block btn-enviar"
                    onClick={recuperarSenha}
                >
                    Recuperar senha
                </button>
            </form>
        </>
    );
}
