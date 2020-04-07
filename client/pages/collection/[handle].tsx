import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCollectionByHandle } from '../../api/shopify/collection';
import { ProductEdge } from '../../interfaces/';

const defaultCollection = {
  description: '',
  products: {
    edges: [],
  },
};

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const [collection, setCollection] = useState(defaultCollection);
  useEffect(() => {
    if (handle) {
      const fetchData = async () => {
        const { collection } = await getCollectionByHandle(handle);
        setCollection(collection);
      };
      fetchData();
    }
  }, [handle]);

  return (
    <div>
      <h2>Products:</h2>
      {collection.products.edges.map((edge: ProductEdge, index: number) => {
        const product = edge.node;
        return (
          <div key={index}>
            <img
              src={product.featuredImage.originalSrc}
              width="100"
              height="100"
            />
            <Link href="/product/[handle]" as={`/product/${product.handle}`}>
              <a>{product.title}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionPage;
