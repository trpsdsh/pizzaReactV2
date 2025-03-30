import React from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../Pagination';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';
import NotFoundBlock from '../components/NotFoundBlock';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const { items, status } = useSelector(selectPizza);

  const pizzasSkeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    fetchPizzasArray();
  }, [searchValue, categoryId, sortType.sortProperty, sortType.order, currentPage]);

  const fetchPizzasArray = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        search,
        currentPage,
        sortType,
      }),
    );
    window.scrollTo(0, 0);
  };
  const pizzasArray = items.map((obj) => (
    <Link key={obj.id} to={`pizza/${obj.id}`}>
      <PizzaBlock  {...obj} />
    </Link> //spreadsyntax
  ));

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          ...params,
          sort: sortType,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType.sortProperty,
        order: sortType.order,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, sortType.order, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <NotFoundBlock />
      ) : (
        <div className='content__items'>{status === 'loading' ? pizzasSkeleton : pizzasArray}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
