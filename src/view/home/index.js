import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/navbar/index";
import { useSelector } from "react-redux";
import EventoCard from "../../components/evento_card/index";
import { firebase, app, storage } from "../../config/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function Home() {
    const [eventos, setEventos] = useState([]);
    let listaEventos = [];

    const db = getFirestore(app);
    useEffect(() => {});
    return (
        <>
            <Navbar />
            <h1 className="user">
                Usuario: {useSelector((state) => state.usuarioEmail)}
            </h1>
            <div className="row">
                {eventos.map((item, index) => (
                    <EventoCard
                        key={index}
                        img={item.foto}
                        titulo={item.titulo}
                        detalhes={item.detalhes}
                        visualisacoes={item.visualisacoes}
                    />
                ))}
            </div>
        </>
    );
}
