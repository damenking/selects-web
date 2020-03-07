import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getAllProducts } from '../api/shopify';

interface Product {
  id: string;
  title: string;
  handle: string;
  images: string[];
}
const ProductsPage: NextPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getAllProducts();
      setProducts(data);
      setError(error);
    };
    fetchData();
  }, []);

  if (error) {
    return <h1>Error loading products....</h1>;
  }

  return (
    <Layout title="products...">
      <div>
        <h1>hi</h1>
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
    </Layout>
  );
};

export default ProductsPage;
