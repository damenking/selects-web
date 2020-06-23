import React, { useContext, useEffect, useState } from 'react';
import { getProductsByIds } from '../../api/shopify/products';
import UserContext from '../../components/UserContext';
import { ProductFavorite } from '../../interfaces/';
import ProductCard from '../ProductCard';
import { updateCustomerFavorites } from '../../api/shopify/customer';

import styles from './Favorites.module.css';

const Favorites: React.FunctionComponent = () => {
  const { favorites, user, removeProductFavorite } = useContext(UserContext);
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductsByIds(favorites.product);
      updateProducts(response.products);
    };
    if (favorites.product.length) {
      fetchData();
    }
  }, []);

  const handleRemoveFromFavorites = (productId: string) => {
    return async () => {
      const favoriteIds = [...favorites.product];
      favoriteIds.splice(favoriteIds.indexOf(`${productId}`), 1);
      const { error } = await updateCustomerFavorites(user.id, favoriteIds);
      if (!error) {
        removeProductFavorite(productId);
      }
    };
  };

  return (
    <div>
      <div className={styles.header}>
        <p>Favorites</p>
      </div>
      <div className={styles.container}>
        {products.map((product: ProductFavorite, index: number) => {
          if (favorites.product.includes(`${product.id}`)) {
            return (
              <ProductCard
                key={index}
                title={product.title}
                imageUrl={product.image.src}
                price={product.variants[0].price}
                handleRemoveFromFavorites={handleRemoveFromFavorites(
                  product.id
                )}
                handle={product.handle}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Favorites;
