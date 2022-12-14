import React from 'react';
import RoutePath from '../components/sharedCompnents/RoutePath';
import FilterProducts from '../components/productsComponents/FilterProducts';
import ProductContent from '../components/productsComponents/ProductContent';
import Footer from '../components/sharedCompnents/Footer';
function Products(props) {
  return (
    <main>
      <RoutePath />
      <FilterProducts />
      <ProductContent />
      <Footer />
    </main>
  );
}

export default Products;
