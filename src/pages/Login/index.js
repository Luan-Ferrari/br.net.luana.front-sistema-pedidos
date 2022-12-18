import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import logoImage from "../../assets/logo.svg"
import padlock from "../../assets/padlock2.svg"
import { carregarRecursosDaAPI } from '../DefaultComponents/loaders/loader';

export default function Login() {

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function login (e) {
        e.preventDefault();

        const data = {
            nomeUsuario,
            senha,
        };

        try {
            const response = await api.post('/login', data);

            localStorage.setItem('usuario', response.headers.usuario);
            localStorage.setItem('accessToken', response.headers.authorization);
            
            navigate('/carregar');
        } catch (err) {
          alert('Login failed! Try again!')
        }
    }

    return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} alt="Confeccções Luana Logo"></img>
        <form onSubmit={login}>
          <h1>Acesse sua conta</h1>
          <input 
            placeholder='Nome do Usuario'
            value={nomeUsuario}
            onChange={e => setNomeUsuario(e.target.value)}
            />
          <input 
            type="password" placeholder='Senha'
            value={senha}
            onChange={e => setSenha(e.target.value)}
            />
            
          <button className="button" type="submit">Login</button>
        </form>
      </section>

      <img className="padlock" src={padlock} alt="Login"></img>
    </div>
    )
}
