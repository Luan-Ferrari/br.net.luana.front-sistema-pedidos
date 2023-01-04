import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import { carregarRecursosDaAPI } from '../DefaultComponents/loaders/loader';



export default function CarregarRecursos() {

    const navigate = useNavigate();

    async function carregarRecursos() {

        await carregarRecursosDaAPI();

        navigate('/produto');

    }

    useEffect(() => {
        carregarRecursos();
    }, [])

    return (
            <div id="load">
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
            </div>
    )
}
