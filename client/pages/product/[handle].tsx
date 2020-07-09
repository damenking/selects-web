import React, { useState, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as momentJS from 'moment';
import { getProductByHandle } from '../../api/shopify/product';
import { getProductAvailability } from '../../api/bta/product';
import { addLineItems } from '../../api/shopify/checkout';
import UserContext from '../../components/UserContext';
import { checkIsMobile } from '../../components/WindowDimensionsProvider';
import { ImageEdge, Product, PreviewImageEdge } from '../../interfaces/';
import Carousel from '../../components/Carousel';
import TimeslotSelector from '../../components/TimeslotSelector';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
// import RevealContent from '../../components/buttons/RevealContent';
// import ExpandableMenuItem from '../../components/ExpandableMenuItem';
import { getVarianceIndexByDays } from '../../util/checkout';
import { updateCustomerFavorites } from '../../api/shopify/customer';

import styles from './handle.module.css';

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
  descriptionHtml: '',
  priceRange: {
    minVariantPrice: {
      amount: '',
    },
  },
  media: {
    edges: [] as PreviewImageEdge[],
  },
  handle: '',
} as Product;

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const {
    checkoutId,
    user,
    favorites,
    removeProductFavorite,
    addProductFavorite,
    setShowAddedToCart,
  } = useContext(UserContext);
  const isMobile = checkIsMobile();
  const [product, setProduct] = useState(defaultProduct);
  const [productImages, setProductImages] = useState([]);
  const [availableDatesObject, updateAvailableDatesObj] = useState({});
  const [selectedVariantIndex, updateSelectedVariantIndex] = useState(0);
  const [selectedStartDate, updatedSelectedStartDate] = useState('');
  const [selectedEndDate, updateSelectedEndDate] = useState('');
  const [isFavorited, updateIsFavorited] = useState(false);

  useEffect(() => {
    updateIsFavorited(favorites.product.indexOf(product.id) !== -1);
  }, [user, product]);

  useEffect(() => {
    if (handle) {
      const fetchData = async () => {
        const { product } = await getProductByHandle(handle);
        setProduct(product);
        getProductAvailability(product.variantIds[0]).then((response) => {
          const { availableDatesObj } = response;
          updateAvailableDatesObj(availableDatesObj);
        });
        const images = product.images.edges.map((edge: ImageEdge) => {
          return edge.node.originalSrc;
        });
        setProductImages(images);
      };
      fetchData();
    }
  }, [handle]);

  const handleAddToFavorites = async () => {
    const favoriteIds = [...favorites.product];
    favoriteIds.push(product.id);
    const { error } = await updateCustomerFavorites(user.id, favoriteIds);
    if (!error) {
      addProductFavorite(product.id);
      updateIsFavorited(true);
    }
  };

  const handleRemoveFromFavorites = async () => {
    const favoriteIds = [...favorites.product];
    favoriteIds.splice(favoriteIds.indexOf(product.id), 1);
    const { error } = await updateCustomerFavorites(user.id, favoriteIds);
    if (!error) {
      removeProductFavorite(product.id);
      updateIsFavorited(false);
    }
  };

  const handleAddToCheckout = () => {
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
    ]).then(() => {
      setShowAddedToCart(true, product, '$347.00 / 7 days');
    });
    updatedSelectedStartDate('');
    updateSelectedEndDate('');
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
            availableDates={availableDatesObject}
            handleDatesSelect={handleDatesSelect}
          />
          <div className={styles.addToButtonsContainerMobile}>
            <div className={styles.addToCartButtonContainer}>
              <PrimaryButton
                isDisabled={!selectedStartDate}
                handleClick={handleAddToCheckout}
                text="Add to cart"
                tooltipText={
                  !selectedStartDate ? 'Select a rental start date' : ''
                }
              />
            </div>
            <SecondaryButton
              handleClick={
                isFavorited ? handleRemoveFromFavorites : handleAddToFavorites
              }
              text={isFavorited ? 'Favorited' : 'Favorite'}
              icon="/static/icons/emptyStar.svg"
              tooltipText={
                !user.id ? 'You must be logged in to favorite items' : ''
              }
              isDisabled={!user.id}
            />
          </div>
        </div>
        {/* possible/probable security risk. Should find an alternative or SSR  */}
        <div
          className="col-span-4"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
        {/* <div className="col-span-4">
          <p>{product.metaData.descriptionShort}</p>
          <ul className={styles.keyFeaturesList}>
            {product.metaData.keyFeatures.map((feature, index) => {
              return <li key={index}>{feature}</li>;
            })}
          </ul>
        </div>
        <div className={`${styles.readMoreContainer} col-span-4`}>
          <RevealContent text="READ MORE" icon="/static/icons/plus.svg">
            <p>{product.metaData.descriptionLong}</p>
          </RevealContent>
        </div>
        <div className={`${styles.extraInfoContainer} col-span-4`}>
          <hr />
          <ExpandableMenuItem title="specs" size="large">
            <p>{product.metaData.specs}</p>
          </ExpandableMenuItem>
          <hr />
          <ExpandableMenuItem title="bill's take" size="large">
            <p>{product.metaData.take}</p>
          </ExpandableMenuItem>
          <hr />
          <ExpandableMenuItem title="shipping" size="large">
            <p>Shipping content to be added sometime in the future...</p>
          </ExpandableMenuItem>
          <hr />
        </div> */}
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
              availableDates={availableDatesObject}
              handleDatesSelect={handleDatesSelect}
            />
            <div className={styles.addToButtonsContainerDesktop}>
              <PrimaryButton
                isDisabled={!selectedStartDate}
                handleClick={handleAddToCheckout}
                text="Add to cart"
                icon="/static/icons/cartAdd.svg"
                tooltipText={
                  !selectedStartDate ? 'Select a rental start date' : ''
                }
              />
              <SecondaryButton
                handleClick={
                  isFavorited ? handleRemoveFromFavorites : handleAddToFavorites
                }
                text={isFavorited ? 'Favorited' : 'Favorite'}
                icon="/static/icons/emptyStar.svg"
                tooltipText={
                  !selectedStartDate
                    ? 'You must be logged in to favorite items'
                    : ''
                }
                isDisabled={!user.id}
              />
            </div>
          </div>
          {/* possible/probable security risk. Should find an alternative or SSR  */}
          <div
            className="col-span-10"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
          {/* <div className="col-span-12">
            <p>{product.metaData.descriptionShort}</p>
            <ul className={styles.keyFeaturesList}>
              {product.metaData.keyFeatures.map((feature, index) => {
                return <li key={index}>{feature}</li>;
              })}
            </ul>
          </div>
          <div className={`${styles.readMoreContainer} col-span-12`}>
            <RevealContent text="READ MORE" icon="/static/icons/plus.svg">
              <p>{product.metaData.descriptionLong}</p>
            </RevealContent>
          </div>
          <div className={`${styles.extraInfoContainer} col-span-12`}>
            <hr />
            <ExpandableMenuItem title="specs" size="large">
              <p>{product.metaData.specs}</p>
            </ExpandableMenuItem>
            <hr />
            <ExpandableMenuItem title="bill's take" size="large">
              <p>{product.metaData.take}</p>
            </ExpandableMenuItem>
            <hr />
            <ExpandableMenuItem title="shipping" size="large">
              <p>Shipping content to be added sometime in the future...</p>
            </ExpandableMenuItem>
            <hr />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
