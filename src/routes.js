import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Books from './pages/Books'
import NovoProduto from './pages/NovoProduto';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/books" element={<Books />}/>
                <Route path="/produto/novo" element={<NovoProduto />}/>
            </Routes>
        </BrowserRouter>
    );
}