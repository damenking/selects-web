import React, { useState, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as momentJS from 'moment';
import { getProductByHandle } from '../../api/shopify/product';
import { getProductAvailability } from '../../api/bta/product';
import { addLineItems } from '../../api/shopify/checkout';
import UserContext from '../../components/UserContext';
import { checkIsMobile } from '../../components/WindowDimensionsProvider';
import { ImageEdge } from '../../interfaces/';
import Carousel from '../../components/Carousel';
import TimeslotSelector from '../../components/TimeslotSelector';
import AddToCart from '../../components/buttons/AddToCart';
import AddToFavorites from '../../components/buttons/AddToFavorites';
import RevealContent from '../../components/buttons/RevealContent';
import ExpandableMenuItem from '../../components/ExpandableMenuItem';
import ProductCard from '../../components/ProductCard';
import { getVarianceIndexByDays } from '../../util/checkout';
import { updateCustomerFavorites } from '../../api/shopify/customer';

import styles from './handle.module.css';

const placeholderImage =
  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*';

const defaultProduct = {
  id: '',
  primaryVariantId: '',
  title: '',
  primaryVariantPrice: '',
  metaData: {
    descriptionShort: '',
    take: '',
    keyFeatures: [],
    descriptionLong: '',
    specs: '',
  },
  primaryVariantStorefrontId: '',
  variantIds: [],
  variantStorefrontIds: [],
  variantPrices: [],
  featuredImage: {
    originalSrc: '',
    transformedSrc: '',
  },
};

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { checkoutId, user } = useContext(UserContext);
  const isMobile = checkIsMobile();
  const [product, setProduct] = useState(defaultProduct);
  const [productImages, setProductImages] = useState([]);
  const [availableDatesObj, updateavailableDatesObj] = useState({});
  const [selectedVariantIndex, updateSelectedVariantIndex] = useState(0);
  const [selectedStartDate, updatedSelectedStartDate] = useState('');
  const [selectedEndDate, updateSelectedEndDate] = useState('');
  const [isFavorited, updateIsFavorited] = useState(false);

  useEffect(() => {
    updateIsFavorited(user.favorites.product.indexOf(product.id) !== -1);
  }, [user, product]);

  useEffect(() => {
    if (handle) {
      const fetchData = async () => {
        const { product } = await getProductByHandle(handle);
        setProduct(product);
        getProductAvailability(product.variantIds[0]).then((response) => {
          const { availableDatesObj } = response;
          updateavailableDatesObj(availableDatesObj);
        });
        const images = product.images.edges.map((edge: ImageEdge) => {
          return edge.node.originalSrc;
        });
        setProductImages(images);
      };
      fetchData();
    }
  }, [handle]);

  const handleAddToFavorites = () => {
    const favoriteIds = [...user.favorites.product];
    favoriteIds.push(product.id);
    updateCustomerFavorites(user.id, favoriteIds);
    updateIsFavorited(true);
  };

  const handleRemoveFromFavorites = () => {
    const favoriteIds = [...user.favorites.product];
    favoriteIds.splice(favoriteIds.indexOf(product.id), 1);
    updateCustomerFavorites(user.id, favoriteIds);
    updateIsFavorited(false);
  };

  const handleAddToCheckout = async () => {
    addLineItems(checkoutId, [
      {
        variantId: product.variantStorefrontIds[selectedVariantIndex],
        quantity: 1,
        customAttributes: [
          { key: 'start', value: selectedStartDate },
          { key: 'finish', value: selectedEndDate },
          {
            key: 'external_id',
            value: product.variantIds[selectedVariantIndex],
          },
        ],
      },
    ]);
  };

  const handleDatesSelect = (
    startDate: momentJS.Moment,
    endDate: momentJS.Moment | undefined
  ) => {
    if (startDate) {
      updatedSelectedStartDate(startDate.toISOString());
    } else {
      updatedSelectedStartDate('');
    }
    if (endDate) {
      updateSelectedEndDate(endDate.toISOString());
    } else {
      updateSelectedEndDate('');
    }
    if (startDate && endDate) {
      const dateDif = endDate.diff(startDate, 'days') + 1;
      updateSelectedVariantIndex(getVarianceIndexByDays(dateDif));
    } else {
      updateSelectedVariantIndex(getVarianceIndexByDays(1));
    }
  };
  console.log(isFavorited);

  if (isMobile) {
    return (
      <div className={`${styles.containerMobile} grid-mobile-layout`}>
        <div className="col-span-4 text-tiny">camera</div>
        <div className="col-span-4">
          <h4>{product.title}</h4>
        </div>
        <div className="col-span-4">
          <Carousel images={productImages} includeSelector={false} />
        </div>
        <div className={`${styles.priceLineContainer} col-span-4`}>
          <h5>
            $347.00
            <span style={{ fontSize: '16px', textTransform: 'lowercase' }}>
              / 7 days (awaiting style change)
            </span>
          </h5>
        </div>
        <div className="col-span-4">WHEN</div>
        <div className={`${styles.dateSelectionOuterContainer} col-span-4`}>
          <TimeslotSelector
            availableDates={availableDatesObj}
            handleDatesSelect={handleDatesSelect}
          />
          <div className={styles.addToButtonsContainerMobile}>
            <div className={styles.addToCartButtonContainer}>
              <AddToCart
                isDisabled={!selectedStartDate}
                handleAddToCheckout={handleAddToCheckout}
              />
            </div>
            <AddToFavorites
              handleAddToFavorites={handleAddToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              isFavorited={isFavorited}
            />
          </div>
        </div>
        <div className="col-span-4">
          <p>{product.metaData.descriptionShort}</p>
          <ul className={styles.keyFeaturesList}>
            {product.metaData.keyFeatures.map((feature, index) => {
              return <li key={index}>{feature}</li>;
            })}
          </ul>
        </div>
        <div className={`${styles.readMoreContainer} col-span-4`}>
          <RevealContent>
            <p>{product.metaData.descriptionLong}</p>
          </RevealContent>
        </div>
        <div className={`${styles.extraInfoContainer} col-span-4`}>
          <hr />
          <ExpandableMenuItem title="specs">
            <p>{product.metaData.specs}</p>
          </ExpandableMenuItem>
          <hr />
          <ExpandableMenuItem title="bill's take">
            <p>{product.metaData.take}</p>
          </ExpandableMenuItem>
          <hr />
          <ExpandableMenuItem title="shipping">
            <p>Shipping content to be added sometime in the future...</p>
          </ExpandableMenuItem>
          <hr />
        </div>
        <div className={`${styles.pairWithTextContainer} col-span-4`}>
          <span className="font-family-apercu-medium">PAIR WITH</span>
        </div>
        <div className="col-span-2">
          <ProductCard imageUrl={placeholderImage} />
        </div>
        <div className="col-span-2">
          <ProductCard imageUrl={placeholderImage} />
        </div>
        <div className={`${styles.similarProductsTextContainer} col-span-4`}>
          <span className="font-family-apercu-medium">SIMILAR PRODUCTS</span>
        </div>
        <div className="col-span-2">
          <ProductCard imageUrl={placeholderImage} />
        </div>
        <div className="col-span-2">
          <ProductCard imageUrl={placeholderImage} />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`${styles.containerDesktop} grid-desktop-layout-expandable`}
    >
      <div className="col-span-5-offset-1">
        <Carousel
          images={productImages}
          includeSelector={true}
          selectorHeight="94px"
        />
      </div>
      <div className="col-span-5">
        <div className="grid-desktop-layout">
          <div className="col-span-12 text-tiny">camera</div>
          <div className="col-span-12">
            <h4>{product.title}</h4>
          </div>
          <div className="col-span-12">
            <h5>
              $347.00
              <span style={{ fontSize: '16px', textTransform: 'lowercase' }}>
                / 7 days (awaiting style change)
              </span>
            </h5>
          </div>
          <div className="col-span-12">WHEN</div>
          <div className={`${styles.dateSelectionOuterContainer} col-span-12`}>
            <TimeslotSelector
              availableDates={availableDatesObj}
              handleDatesSelect={handleDatesSelect}
            />
            <div className={styles.addToButtonsContainerDesktop}>
              <AddToCart
                isDisabled={!selectedStartDate}
                handleAddToCheckout={handleAddToCheckout}
              />
              <AddToFavorites
                handleAddToFavorites={handleAddToFavorites}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
                isFavorited={isFavorited}
              />
            </div>
          </div>
          <div className="col-span-12">
            <p>{product.metaData.descriptionShort}</p>
            <ul className={styles.keyFeaturesList}>
              {product.metaData.keyFeatures.map((feature, index) => {
                return <li key={index}>{feature}</li>;
              })}
            </ul>
          </div>
          <div className={`${styles.readMoreContainer} col-span-12`}>
            <RevealContent>
              <p>{product.metaData.descriptionLong}</p>
            </RevealContent>
          </div>
          <div className={`${styles.extraInfoContainer} col-span-12`}>
            <hr />
            <ExpandableMenuItem title="specs">
              <p>{product.metaData.specs}</p>
            </ExpandableMenuItem>
            <hr />
            <ExpandableMenuItem title="bill's take">
              <p>{product.metaData.take}</p>
            </ExpandableMenuItem>
            <hr />
            <ExpandableMenuItem title="shipping">
              <p>Shipping content to be added sometime in the future...</p>
            </ExpandableMenuItem>
            <hr />
          </div>
        </div>
      </div>

      <div className={`${styles.pairWithTextContainer} col-span-10-offset-1`}>
        <span className="font-family-apercu-medium">PAIR WITH</span>
      </div>
      <div className="col-span-5-offset-1">
        <ProductCard imageUrl={placeholderImage} />
      </div>
      <div className="col-span-5">
        <ProductCard imageUrl={placeholderImage} />
      </div>

      <div
        className={`${styles.similarProductsTextContainer} col-span-10-offset-1`}
      >
        <span className="font-family-apercu-medium">ALSO GREAT</span>
      </div>
      <div className="col-span-5-offset-1">
        <ProductCard imageUrl={placeholderImage} />
      </div>
      <div className="col-span-5">
        <ProductCard imageUrl={placeholderImage} />
      </div>
    </div>
  );
};

export default ProductPage;
