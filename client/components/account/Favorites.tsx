import React, { useContext, useEffect, useState } from 'react';
import { getProductsByIds } from '../../api/shopify/products';
import UserContext from '../../components/UserContext';
import { ProductFavorite } from '../../interfaces/';

// import styles from './Favorites.module.css';

const Favorites: React.FunctionComponent = () => {
  const { favorites } = useContext(UserContext);
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductsByIds(favorites.product);
      updateProducts(response.products);
    };
    if (favorites.product.length) {
      fetchData();
    }
  }, [favorites]);
  return (
    <div>
      <h4>Favorites Page</h4>
      {products.map((product: ProductFavorite, index: number) => {
        return (
          <div key={index}>
            <p>{product.title}</p>
            <img src={product.image.src} height="100" width="100" />
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
