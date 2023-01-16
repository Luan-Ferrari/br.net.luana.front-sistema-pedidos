import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Produto from './pages/Produtos/Produto'
import NovoProduto from './pages/Produtos/NovoProduto';
import AlterarProduto from './pages/Produtos/AlterarProduto';
import CarregarRecursos from './pages/CarregarRecursos';
import AlterarProdutosSelecionados from './pages/Produtos/AlterarSelecao';
import AlterarProdutosRelacionados from './pages/Produtos/AlterarRelacao';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/carregar" element={<CarregarRecursos />}/>
                <Route path="/produto" element={<Produto />}/>
                <Route path="/produto/novo" element={<NovoProduto />}/>
                <Route path="/produto/alterar/:id_alterado" element={<AlterarProduto />}/>
                <Route path="/produto/alterar/selecao" element={<AlterarProdutosSelecionados />}/>
                <Route path="/produto/alterar/relacao" element={<AlterarProdutosRelacionados />}/>
            </Routes>
        </BrowserRouter>
    );
}