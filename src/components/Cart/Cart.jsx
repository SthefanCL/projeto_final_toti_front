import React, { useContext } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import StoreContext from '../Store/Context';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';


const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();
  const { cliente } = useContext(StoreContext);

  const handleEmptyCart = () => onEmptyCart(cliente);

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">Você não possui nenhum item no carrinho T.T,
      <Link className={classes.link} to="/"> comece adicionando alguns itens!</Link>!
    </Typography>
  );
  if (!cart) return 'Loading';

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} sm={4} key={item.id_produto}>
            <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: {cart.valor_produto}</Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Vaziar carrinho</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Comprar</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Seu carrinho de compras</Typography>
      { !cart.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;
