import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { searchProducts } from '../api/shopify/products';
import { Product } from '../interfaces/';

const searchPage: NextPage = () => {
  const router = useRouter();
  const { searchTerm } = router.query;
  const [searchString, updateSearchString] = useState('');
  const [searchedForString, updateSearchedForString] = useState(searchTerm);
  const [products, updateProducts] = useState([]);
  const [loading, updateLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const fetchProducts = async () => {
    updateLoading(true);
    const searchQuerystring = searchString ? searchString : searchTerm;
    const response = await searchProducts(searchQuerystring);
    const { products } = response;
    updateSearchedForString(searchQuerystring);
    updateProducts(products);
    updateLoading(false);
  };

  const handleExecuteNewSearch = () => {
    fetchProducts();
  };

  if (loading) {
    return <h3>LOADING....</h3>;
  }

  return (
    <div>
      <p>This is a search page!!!</p>
      <p>Showing results for "{searchedForString}"</p>
      <label>New search:</label>
      <input
        type="text"
        value={searchString}
        onChange={(e) => updateSearchString(e.target.value)}
      />
      <button onClick={handleExecuteNewSearch}>Search!</button>
      <br />
      <br />
      <div>
        {products.map((product: Product, index) => {
          return (
            <div key={index}>
              {product.featuredImage && (
                <img
                  src={product.featuredImage.originalSrc}
                  width="100"
                  height="100"
                />
              )}
              <Link href="/product/[handle]" as={`/product/${product.handle}`}>
                <a>{product.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default searchPage;
