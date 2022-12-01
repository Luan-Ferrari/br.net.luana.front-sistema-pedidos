import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Produto from './pages/Produtos/Produto'
import NovoProduto from './pages/Produtos/NovoProduto';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/produto" element={<Produto />}/>
                <Route path="/produto/novo" element={<NovoProduto />}/>
            </Routes>
        </BrowserRouter>
    );
}