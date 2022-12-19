import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import { carregarRecursosDaAPI } from '../DefaultComponents/loaders/loader';



export default function CarregarRecursos() {

    const navigate = useNavigate();

    async function carregarRecursos () {

        await carregarRecursosDaAPI();
            
        navigate('/produto');
  
    }

    useEffect(() => {
        carregarRecursos();
    }, [])

    return (
    <div className="load-container">
      <p>Os recursos estãos sendo recebidos da API</p>
    </div>
    )
}
