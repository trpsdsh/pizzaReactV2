import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'Популярности ↓',
    sortProperty: 'rating',
    order: 'desc',
  });
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `search=${searchValue}` : '';
  const pizzasSkeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzasArray = items //Поиск для статики
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue)) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((obj) => (
      <PizzaBlock //  {...obj} можно вместо title={obj.title}... spreadsyntax
        key={obj.id}
        title={obj.title}
        price={obj.price}
        image={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ));
  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://67c4cd16c4649b9551b490e4.mockapi.io/items?${category}&${search}&sortBy=${sortType.sortProperty}&order=${sortType.order}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} order={sortType.order} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? pizzasSkeleton : pizzasArray}</div>
    </div>
  );
};

export default Home;
