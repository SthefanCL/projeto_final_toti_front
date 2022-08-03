import React, { useState, useContext } from 'react';
import axios from 'axios';
import StoreContext from '../Store/Context';

import { Typography } from '@material-ui/core';
import useStyles from './styles';

import { Link, useHistory } from 'react-router-dom';

export default function Cadastro() {

  const classes = useStyles();
  const history = useHistory();
  const { setCliente } = useContext(StoreContext);

  const [dataCadastro, setDataCadastro] = useState ({ cpf: "", nome: "", endereco: "", cep: "", telefone: "", email: "", senha: ""})

  const handleChange = (event) => {
    setDataCadastro({
      ...dataCadastro,
      [event.target.name]: event.target.value
    })
  }

  const URL = "http://localhost:3001/cliente"

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(URL,dataCadastro)
    .then((response) => {
      setCliente(response.data.id_cliente);
      history.push("/login");
    }, (error) => {
      console.log(error);
    });
  }

   

  return (
    <div className={classes.container}>
      <div className={classes.containerForm}>
            <form onSubmit={handleSubmit}>
              <label><h3>CPF:
                  <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    defaultValue={dataCadastro.cpf}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <label><h3>Nome:
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    defaultValue={dataCadastro.nome}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <label><h3>Endereco:
                  <input
                    type="text"
                    name="endereco"
                    placeholder="Endereco"
                    defaultValue={dataCadastro.endereco}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <label><h3>CEP:
                  <input
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    defaultValue={dataCadastro.cep}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <label><h3>Telefone:
                  <input
                    type="text"
                    name="telefone"
                    placeholder="Telefone"
                    defaultValue={dataCadastro.telefone}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <label><h3>E-mail:
                  <input
                    type="text"
                    name="email"
                    placeholder="E-Mail"
                    defaultValue={dataCadastro.email}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <label><h3>Senha:
                  <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    defaultValue={dataCadastro.senha}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <div className="button">                
                <button className="salvar" type="submit">Cadastre-se</button>
              </div>
            </form>            
              <div className="buttonNew">
              <Typography component={Link} to="/login" variant="button" className={classes.button} color="inherit">
                Fazer Login
              </Typography>
              </div>
      </div>
    </div>
  );
}
