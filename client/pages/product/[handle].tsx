// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getProductByHandle } from '../../api/shopify/product';
import { getProductAvailability } from '../../api/bta/product';
import { addLineItems } from '../../api/shopify/checkout';
import UserContext from '../../components/UserContext';
// import DatePicker from '../../components/DatePicker';
// import { getRentalEndDate } from '../../util/time';
import { checkIsMobile } from '../../components/WindowDimensionsProvider';
import { ImageEdge } from '../../interfaces/';
import Carousel from '../../components/Carousel';
import TimeslotSelector from '../../components/TimeslotSelector';
import AddToCart from '../../components/buttons/AddToCart';
import AddToFavorites from '../../components/buttons/AddToFavorites';
import RevealContent from '../../components/buttons/RevealContent';
import ExpandableMenuItem from '../../components/ExpandableMenuItem';

import styles from './handle.module.css';

const defaultProduct = {
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
  const { checkoutId } = useContext(UserContext);
  const isMobile = checkIsMobile();
  const [product, setProduct] = useState(defaultProduct);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableDatesObj, updateavailableDatesObj] = useState({});
  const [selectedVariantIndex, updateSelectedVariantIndex] = useState(0);
  const [selectedStartDate, updatedSelectedStartDate] = useState('');

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
        setLoading(false);
      };
      fetchData();
    }
  }, [handle]);

  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        getProductAvailability(product.variantIds[selectedVariantIndex]).then(
          (response) => {
            const { availableDatesObj } = response;
            updateavailableDatesObj(availableDatesObj);
          }
        );
      };
      fetchData();
    }
  }, [selectedVariantIndex]);

  // const handleAddToCheckout = async () => {
  //   addLineItems(checkoutId, [
  //     {
  //       variantId: product.variantStorefrontIds[selectedVariantIndex],
  //       quantity: 1,
  //       customAttributes: [
  //         { key: 'start', value: selectedStartDate },
  //         {
  //           key: 'external_id',
  //           value: product.variantIds[selectedVariantIndex],
  //         },
  //       ],
  //     },
  //   ]);
  // };

  // const handleVariantSelectionChange = (e: React.SyntheticEvent): void => {
  //   const { value } = e.target as HTMLInputElement;
  //   updateSelectedVariantIndex(parseInt(value, 10));
  // };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      updatedSelectedStartDate(date.toISOString());
    } else {
      updatedSelectedStartDate('');
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
          <Carousel images={productImages} />
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
            handleStartDateSelect={handleStartDateSelect}
          />
          <div className={styles.addToButtonsContainerMobile}>
            <div className={styles.addToCartButtonContainer}>
              <AddToCart />
            </div>
            <AddToFavorites />
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
          <img
            className="responsive-img clickable"
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*"
          />
        </div>
        <div className="col-span-2">
          <img
            className="responsive-img clickable"
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*"
          />
        </div>
        <div className="col-span-2 row-span-3">
          <div className="col-span-4 text-tiny">product type</div>
          <p>Product Name</p>
          <small>
            <u>$99 per day</u>
          </small>
        </div>
        <div className="col-span-2 row-span-3">
          <div className="col-span-4 text-tiny">product type</div>
          <p>Product Name</p>
          <small>
            <u>$99 per day</u>
          </small>
        </div>
        <div className={`${styles.similarProductsTextContainer} col-span-4`}>
          <span className="font-family-apercu-medium">SIMILAR PRODUCTS</span>
        </div>
        <div className="col-span-2">
          <img
            className="responsive-img clickable"
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*"
          />
        </div>
        <div className="col-span-2">
          <img
            className="responsive-img clickable"
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*"
          />
        </div>
        <div className="col-span-2 row-span-3">
          <div className="col-span-4 text-tiny">product type</div>
          <p>Product Name</p>
          <small>
            <u>$99 per day</u>
          </small>
        </div>
        <div className="col-span-2 row-span-3">
          <div className="col-span-4 text-tiny">product type</div>
          <p>Product Name</p>
          <small>
            <u>$99 per day</u>
          </small>
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.containerDesktop} grid-desktop-layout`}>
      <div className="col-span-1"></div>
      <div className="col-span-5">
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
          <div className={`col-span-12`}>
            <h5>
              $347.00
              <span style={{ fontSize: '16px', textTransform: 'lowercase' }}>
                / 7 days (awaiting style change)
              </span>
            </h5>
          </div>
          <div className="col-span-12">WHEN</div>
          <div className={`${styles.dateSelectionOuterContainer} col-span-10`}>
            <TimeslotSelector
              availableDates={availableDatesObj}
              handleStartDateSelect={handleStartDateSelect}
            />
            <div className={styles.addToButtonsContainerDesktop}>
              <AddToCart />
              <AddToFavorites />
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
      <div className="col-span-1"></div>
      <div className="col-span-1 row-span-10"></div>
      <div className={`${styles.pairWithTextContainer} col-span-10`}>
        <span className="font-family-apercu-medium">PAIR WITH</span>
      </div>
      <div className="col-span-5">
        <img
          className="responsive-img clickable"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*"
        />
      </div>
      <div className="col-span-5">
        <img
          className="responsive-img clickable"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*"
        />
      </div>
      <div className="col-span-5 row-span-3">
        <div className="col-span-4 text-tiny">product type</div>
        <p>Product Name</p>
        <small>
          <u>$99 per day</u>
        </small>
      </div>
      <div className="col-span-5 row-span-3">
        <div className="col-span-4 text-tiny">product type</div>
        <p>Product Name</p>
        <small>
          <u>$99 per day</u>
        </small>
      </div>
      <div className={`${styles.similarProductsTextContainer} col-span-11`}>
        <span className="font-family-apercu-medium">ALSO GREAT</span>
      </div>
      <div className="col-span-5">
        <img
          className="responsive-img clickable"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*"
        />
      </div>
      <div className="col-span-5">
        <img
          className="responsive-img clickable"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1085741674.jpg?crop=0.668xw:1.00xh;0.175xw,0&resize=480:*"
        />
      </div>
      <div className="col-span-5 row-span-3">
        <div className="col-span-4 text-tiny">product type</div>
        <p>Product Name</p>
        <small>
          <u>$99 per day</u>
        </small>
      </div>
      <div className="col-span-5 row-span-3">
        <div className="col-span-4 text-tiny">product type</div>
        <p>Product Name</p>
        <small>
          <u>$99 per day</u>
        </small>
      </div>
      <div className="col-span-1 row-span-10"></div>
    </div>
  );
};

export default ProductPage;

// <div>
//         <h2>Product: {product.title}</h2>
//         <div>
//           <h4>Prices:</h4>
//           <ul>
//             <li>3 days: {product.variantPrices[0]}</li>
//             <li>5 days: {product.variantPrices[1]}</li>
//             <li>7 days: {product.variantPrices[2]}</li>
//           </ul>
//         </div>
//         <p>Description: {product.metaData.descriptionShort}</p>
//         <br />
//         <p>Will's expert take: {product.metaData.take}</p>
//         <br />
//         <div>
//           <h4>
//             Select duration for availability then choose date from calendar
//           </h4>
//           <input
//             type="radio"
//             name="variant-radio"
//             value={0}
//             checked={selectedVariantIndex === 0}
//             onChange={(e) => handleVariantSelectionChange(e)}
//           />
//           <label>3 Days</label>
//         </div>
//         <div>
//           <input
//             type="radio"
//             name="variant-radio"
//             value={1}
//             checked={selectedVariantIndex === 1}
//             onChange={(e) => handleVariantSelectionChange(e)}
//           />
//           <label>5 Days</label>
//         </div>
//         <div>
//           <input
//             type="radio"
//             name="variant-radio"
//             value={2}
//             checked={selectedVariantIndex === 2}
//             onChange={(e) => handleVariantSelectionChange(e)}
//           />
//           <label>7 Days</label>
//         </div>
//         <div>
//           <h4>Enter rental start date:</h4>
//           <DatePicker
//             availableDates={availableDatesObj}
//             handleStartDateSelect={handleStartDateSelect}
//           />
//           {!!selectedStartDate.length && (
//             <>
//               <h4>
//                 Rental end date:{' '}
//                 {getRentalEndDate(
//                   selectedStartDate,
//                   selectedVariantIndex
//                 ).toLocaleDateString()}
//               </h4>
//               <button onClick={() => handleAddToCheckout()}>Add to cart</button>
//             </>
//           )}
//         </div>
//       </div>
