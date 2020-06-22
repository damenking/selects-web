import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ProductEdge } from '../../interfaces';
import { getProductsByTags } from '../../api/shopify/products';
import ProductCard from '../../components/ProductCard';
import { currencyFormatter } from '../../util/currency';
import { checkIsMobile } from '../../components/WindowDimensionsProvider';

import styles from './byTags.module.css';

const ProductsByTagsPage: NextPage = () => {
  const router = useRouter();
  const tags = router.query.tags as string;
  const [products, setProducts] = useState([] as ProductEdge[]);
  const isMobile = checkIsMobile();
  useEffect(() => {
    if (tags) {
      const fetchData = async () => {
        const tagArr = tags.split(',');
        const response = await getProductsByTags(tagArr);
        setProducts(response.products);
      };
      fetchData();
    }
  }, [tags]);

  if (isMobile) {
    return (
      <div className={`${styles.containerMobile} grid-mobile-layout`}>
        <div className="col-span-4 text-tiny">results</div>
        {products.map((edge: ProductEdge, index: number) => {
          const product = edge.node;
          const price = product.priceRange?.minVariantPrice?.amount
            ? parseInt(product.priceRange.minVariantPrice.amount, 10)
            : 0;
          if (price > 0) {
            return (
              <div className="col-span-2" key={index}>
                <ProductCard
                  imageUrl={
                    product.media.edges[0]?.node.previewImage.originalSrc
                  }
                  title={product.title}
                  price={`${currencyFormatter.format(price)} per day`}
                  handle={product.handle}
                />
              </div>
            );
          }
        })}
      </div>
    );
  }
  return (
    <div
      className={`${styles.containerDesktop} grid-desktop-layout-expandable-2`}
    >
      <div className="col-span-10-offset-1 text-tiny">results</div>
      {products.map((edge: ProductEdge, index: number) => {
        let gridClassName = '';
        if (index === 0) {
          gridClassName = 'col-span-4-offset-2';
        } else if (index === 1) {
          gridClassName = 'col-span-4';
        } else if (!((index + 2) % 4)) {
          // offset first column of 4 column row
          gridClassName = 'col-span-2-offset-2';
        } else {
          gridClassName = 'col-span-2';
        }
        const product = edge.node;
        const price = product.priceRange?.minVariantPrice?.amount
          ? parseInt(product.priceRange.minVariantPrice.amount, 10)
          : 0;
        if (price > 0) {
          return (
            <div className={gridClassName} key={index}>
              <ProductCard
                imageUrl={product.media.edges[0]?.node.previewImage.originalSrc}
                title={product.title}
                price={`${currencyFormatter.format(price)} per day`}
                handle={product.handle}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default ProductsByTagsPage;
