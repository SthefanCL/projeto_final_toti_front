import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import StoreContext from '../../Store/Context';


import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const { cliente } = useContext(StoreContext);

  const handleAddToCart = () => onAddToCart(product.id_produto, 1, cliente);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.foto_produto} title={product.nome_produto} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.nome_produto}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            R${product.valor_produto}
          </Typography>
        </div>
        {/* <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" /> */}
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;

