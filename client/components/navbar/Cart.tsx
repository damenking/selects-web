import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import UserContext from '../../components/UserContext';
import AddedToCart from './AddedToCart';

const Profile: React.FunctionComponent = () => {
  const {
    showAddedToCart,
    lastProductAddedToCart,
    addedToCartPriceText,
    setShowAddedToCart,
  } = useContext(UserContext);
  const [showDropdown, updateShowDropdown] = useState(showAddedToCart);

  const closeAddedToCart = () => {
    setShowAddedToCart(false);
  };

  useEffect(() => {
    updateShowDropdown(showAddedToCart);
    if (showAddedToCart) {
      setTimeout(() => {
        updateShowDropdown(false);
      }, 6000);
    }
  }, [showAddedToCart]);

  return (
    <div>
      <Link href="/cart">
        <img className="clickable" src="/static/icons/cart.svg" />
      </Link>
      <AddedToCart
        title={lastProductAddedToCart?.title}
        imageUrl={lastProductAddedToCart?.featuredImage?.originalSrc}
        priceText={addedToCartPriceText}
        handleClose={closeAddedToCart}
        hidden={!showDropdown}
      />
    </div>
  );
};

export default Profile;
