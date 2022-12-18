import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import logoImage from "../../assets/logo.svg"
import padlock from "../../assets/padlock2.svg"
import { carregarRecursosDaAPI } from '../DefaultComponents/loaders/loader';

export default function CarregarRecursos() {

    const navigate = useNavigate();

    async function carregarRecursos (e) {
        e.preventDefault();

        carregarRecursosDaAPI();
            
        navigate('/carregar');
  
    }

    return (
    <div className="load-container">
      <p>Os recursos estãos sendo recebidos da API</p>
      <button 
        onClick = {e => carregarRecursos(e)}
        > Click me</button>
    </div>
    )
}
