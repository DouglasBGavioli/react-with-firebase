import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./evento_cadastro.css";
import { Link } from "react-router-dom";

import { firebase, app, storage } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import Navbar from "../../components/navbar";

export default function EventoCadastro() {
    const [carregando, setCarregando] = useState(false);
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [foto, setFoto] = useState();
    const usuarioEmail = useSelector((state) => state.usuarioEmail);

    const db = getFirestore(app);
    async function cadastrar() {
        setMsgTipo(null);
        setCarregando(true);
        try {
            const docRef = await addDoc(collection(db, "eventos"), {
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                usuario: usuarioEmail,
                visualizcoes: 0,
                foto: hora,
                publico: 1,
                criacao: new Date(),
            });
            const storageRef = ref(storage, `imagens/${foto.name}`);
            console.log("Document ID: ", docRef.id);
            uploadBytes(storageRef, foto);
            setMsgTipo("sucesso");
            setCarregando(false);
        } catch (e) {
            console.error("Error adding document: ", e);
            setMsgTipo("erro");
            setCarregando(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="col-12 px-4 mt-4">
                <div className="row">
                    <h3 className="mx-auto text-center ">Novo evento</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label>Titulo:</label>
                        <input
                            onChange={(e) => setTitulo(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipo do Evento:</label>
                        <select
                            onChange={(e) => setTipo(e.target.value)}
                            className="form-control"
                        >
                            <option disabled selected>
                                -- Selecione um tipo --
                            </option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Descrição do evento:</label>
                        <textarea
                            onChange={(e) => setDetalhes(e.target.value)}
                            className="form-control"
                            rows="3"
                        />
                    </div>
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input
                                onChange={(e) => setData(e.target.value)}
                                type="date"
                                className="form-control"
                            />
                        </div>
                        <div className="col-6">
                            <label>Horas:</label>
                            <input
                                onChange={(e) => setHora(e.target.value)}
                                type="time"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Upload da foto:</label>
                        <input
                            onChange={(e) => setFoto(e.target.files[0])}
                            type="file"
                            className="form-control"
                        />
                    </div>
                    <div className="row">
                        {carregando ? (
                            <div
                                className="spinner-border text-danger mx-auto mt-4"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-lg btn-block mt-4 mb-5 btn-cadastro"
                                onClick={cadastrar}
                            >
                                Publicar Evento
                            </button>
                        )}
                    </div>
                </form>
                <div className="msg-login text-center mt-1">
                    {msgTipo === "sucesso" && (
                        <span>
                            <strong>WoW! </strong> Evento publicado &#128526;
                        </span>
                    )}
                    {msgTipo === "erro" && (
                        <span>
                            <strong>Ops! </strong> Não foi possivel publicar o
                            envento &#128546;
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}
