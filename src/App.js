import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, Checkout, Login, Cadastro, StoreProvider } from './components';

const App = () => {
  const cliente = localStorage.getItem("cliente");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [totalItems, setTotalItems] = useState(Number);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
 
 
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/produtos`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/cart`, { params: { id_cliente: cliente} }
      );
      setCart(res.data);
      setTotalItems(res.data.length)
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (productId, quantidade, id_cliente) => {
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id_produto === productId) {
          handleUpdateCartQty(cart[i].id, cart[i].quantidade + 1 , cart[i].id_cliente, cart[i].id_produto);
          break;
        } 
        if (cart.length - 1 === i && cart[i].id_produto !== productId){
          try {
            const res = await axios.post(
              `http://localhost:3001/cart`,
              {
                "id_produto": productId,
                "id_cliente": id_cliente,
                "quantidade": quantidade
              }
            );
            if(res.status !== 200) {
              console.log(res)
            }
            fetchCart()
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else {
      try {
        const res = await axios.post(
          `http://localhost:3001/cart`,
          {
            "id_produto": productId,
            "id_cliente": id_cliente,
            "quantidade": quantidade
          }
        );
        if(res.status !== 200) {
          console.log(res)
        }
        fetchCart()
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdateCartQty = async (id, nova_quantidade, id_cliente, id_produto) => {
    if (nova_quantidade <= 0) {
      handleRemoveFromCart(id_produto, id_cliente)
    } else {
      try {
        const res = await axios.put(
          `http://localhost:3001/cart/updatequantidade`,
          {
            "id": id,
            "nova_quantidade": nova_quantidade,
            "id_cliente": id_cliente
          }
        );
        if(res.status !== 200) {
          console.log(res)
        }
        fetchCart()
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRemoveFromCart = async (id_produto, id_cliente) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/cart/`+id_produto+'/'+id_cliente
      );
      if(res.status !== 200) {
        console.log(res)
      }
      fetchCart()
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmptyCart = async (id_cliente) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/cart/`+id_cliente
      );
      if(res.status !== 200) {
        console.log(res)
      }
      fetchCart()
    } catch (err) {
      console.log(err);
    }
  };

  const refreshCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/cart`,
        {
          "id_cliente": cliente,
        }
      );
      if(res.status !== 200) {
        console.log(res)
      }
      setCart(res.data);
      setTotalItems(cart.length)
    } catch (err) {
      console.log(err);
    }
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      // const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      // setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <StoreProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar totalItems={totalItems} handleDrawerToggle={handleDrawerToggle} />
            <Switch>
              <Route exact path="/">
                <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
              </Route>
              <Route exact path="/cart">
                <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
              </Route>
              <Route path="/checkout" exact>
                <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
              </Route>
              <Route path="/login" exact>
                <Login error={errorMessage} />
              </Route>
              <Route path="/cadastro" exact>
                <Cadastro error={errorMessage} />
              </Route>
            </Switch>
        </div>
      </Router>
    </StoreProvider>

  );
};

export default App;
