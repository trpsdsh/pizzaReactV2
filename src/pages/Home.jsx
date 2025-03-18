import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { searchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);

  const { searchValue } = React.useContext(searchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `search=${searchValue}` : '';
  const pizzasSkeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzasArray = items.map((obj) => (
    <PizzaBlock
      key={obj.id}
      title={obj.title}
      price={obj.price}
      image={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />
  ));
  //  {...obj} можно вместо title={obj.title}... spreadsyntax

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://67c4cd16c4649b9551b490e4.mockapi.io/items?${category}&${search}&sortBy=${sortType}&order=${sortType.order}`,
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
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? pizzasSkeleton : pizzasArray}</div>
    </div>
  );
};

export default Home;
