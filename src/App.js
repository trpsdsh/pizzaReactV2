import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';

function App() {
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
            <PizzaBlock title='negri' price={200} />
            <PizzaBlock title='пицца' price={20000} />
            <PizzaBlock title='еще пицы' price={20540} />
            <PizzaBlock title='чут' price={20} />
            <PizzaBlock title='пица' price={2040} />
            <PizzaBlock title='nкалик' price={0} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
