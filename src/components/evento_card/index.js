import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { firebase, app, storage } from "../../config/firebase";

import "./evento_card.css";

export default function EventoCard({
    key,
    img,
    titulo,
    detalhes,
    visualisacoes,
}) {
    const [urlImagem, setUrlImagem] = useState();

    return (
        <div className="col-md-3 col-sm-12">
            <img
                src="https://via.placeholder.com/100x100"
                alt="imagem-card"
                className="card-img-top img-cartao"
            />
            <div className="card-body" key={key}>
                <h5>{titulo}</h5>
                <p className="card-text text-justify">{detalhes}</p>
                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to="/" className="btn btn-sm btn-detalhes">
                            + Detalhes
                        </Link>
                    </div>
                    <div className="col-6 text-right">
                        <i className="fas fa-eye" />
                        <span>{visualisacoes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
