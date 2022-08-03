import React, { useState, useContext } from 'react';
import axios from 'axios';
import StoreContext from '../Store/Context';

import { Typography } from '@material-ui/core';
import useStyles from './styles';

import { Link, useHistory } from 'react-router-dom';

export default function Login() {

  const classes = useStyles();
  const history = useHistory();
  const { setCliente } = useContext(StoreContext);

  const [data, setData] = useState ({email: "", senha: ""})

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const URL = "http://localhost:3001/login"

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(URL,data)
    .then((response) => {
      setCliente(response.data.id_cliente);
      history.push("/");
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div className={classes.container}>
      <div className={classes.containerForm}>
            <form onSubmit={handleSubmit}>
              <label><h3>E-mail:
                  <input
                    type="text"
                    name="email"
                    placeholder="E-Mail"
                    defaultValue={data.email}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <label><h3>Senha:
                  <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    defaultValue={data.senha}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <div className="button">                
                <button className="salvar" type="submit">Accese</button>
              </div>
            </form>            
              <div className="buttonNew">
              <Typography component={Link} to="/cadastro" variant="button" className={classes.button} color="inherit">
                Cadastrese aqui
              </Typography>
              </div>
      </div>
    </div>
  );
}
