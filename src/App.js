import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock'
import Skeleton from './components/PizzaBlock/Skeleton'

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://67c4cd16c4649b9551b490e4.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {items.map((obj) => (
              <Skeleton
                key={obj.id}
                title={obj.title}
                price={obj.price}
                image={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              /> //{...obj} можно вместо title={obj.title} spreadsyntax
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
