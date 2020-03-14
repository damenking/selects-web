import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { getAllProducts } from '../api/shopify/products';
import { Product } from '../interfaces/';

const ProductsPage: NextPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { products, error } = await getAllProducts();
      setProducts(products);
      setError(error);
    };
    fetchData();
  }, []);

  if (error) {
    return <h1>Error loading products....</h1>;
  }

  return (
    <div>
      <h2>Products:</h2>
      {products.map((product: Product, index: number) => {
        return (
          <div key={index}>
            <img src={product.images[0]} width="100" height="100" />
            <Link href="/product/[handle]" as={`/product/${product.handle}`}>
              <a>{product.title}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
