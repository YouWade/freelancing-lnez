import HeroBanner from '@components/HeroBanner/HeroBanner';
import ProductCarousel from '@components/ProductCarousel/ProductCarousel';
import './HomePage.scss';

const HomePage = () => {
  const products = Array(16).fill(null).map((_, index) => ({
    id: index + 1,
    title: '女士短版襯衫',
    price: '$590'
  }));
  return (
    <div className="home-page">
      <HeroBanner />
      <ProductCarousel title="熱銷排行榜" initialItemsToShow={8} products={products} />
      <ProductCarousel title="新品上架" initialItemsToShow={8} products={products} />
    </div>
  );
};

export default HomePage;
