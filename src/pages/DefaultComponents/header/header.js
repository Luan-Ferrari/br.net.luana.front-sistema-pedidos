import logoImage from "../../../assets/logo_vertical_branco.png";
import { buildData, buildHorario, buildSaudacao } from '../../DefaultComponents/manipuladores/manipuladorDatasESaudacoes';

import { TbPower } from 'react-icons/tb'

import './header.css';

let date = new Date();

export function createDefaultHeader() {
    return (
        <section className="header-container">
            <img className="logo" src={logoImage} alt="Confeccções Luana Logo"></img>
            <div className="exit">
                <button type="button">
                    <TbPower/>
                </button>
                <p>Sair</p>
            </div> 
                <div className="info-date-container">
                    <div id="dia-atual" className='info-date-child'>{buildData(date)}</div>
                    <div id="hora-atual" className='info-date-child'>{buildHorario(date)}</div>
                    <div id="saudacao-usuario" className='info-date-child'>{buildSaudacao()}</div>
                </div>
        </section>
    )
}