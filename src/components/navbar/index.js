import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
    const dispatch = useDispatch();
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <span className="navbar-brand text-white fw-bold">Eventos</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        {useSelector((state) => state.usuarioLogado) ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="eventosCadastro"
                                        className="nav-link"
                                    >
                                        Publicar eventos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className="nav-link">
                                        Meus Eventos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        onClick={() =>
                                            dispatch({ type: "LOG_OUT" })
                                        }
                                        className="nav-link"
                                    >
                                        Sair
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/usuario_novo"
                                        className="nav-link"
                                    >
                                        Cadastrar
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
