import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { addItem, CartItem, selectCartItem } from '../../redux/slices/cartSlice'; 
import { useAppDispatch } from '../../redux/store';
import styles from './FullPizza.module.scss';

const FullPizza:React.FC = () => {
  const [pizza, setPizza] = React.useState<{ image: string; title: string; price: number }>();
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const cartItem = useSelector(selectCartItem(id!));
  const addedCount = cartItem ? cartItem.count : 0;


  const onClickAdd = () => {
    if (addedCount > 0) return;
    const item: CartItem = {
      id: id!,
      title: pizza!.title,
      price: pizza!.price,
      image: pizza!.image,
      types: "default",
      count: 1,
      sizes: 0,
      };
    dispatch(addItem(item));
  };

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://67c4cd16c4649b9551b490e4.mockapi.io/items/` + id);
        setPizza(data);
      } catch (error) {
        alert('Пиццы нет');
        navigate(`/`);
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className={styles.container}>
      <div className={styles.pizza}>
        <img className={styles.image} src={pizza.image} alt={pizza.title} />
        <p className={styles.title}>{pizza.title}</p>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.buttonsWrapper}>
        <Link to='/' className={styles.button}>
          <span className={styles.buttonText}>На главную</span>
        </Link>
      
        <button onClick={onClickAdd} className={styles.button} disabled={addedCount > 0}>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span className={styles.buttonText}>Добавить</span>
        </button>
      </div>
    </div>
  );
}
export default FullPizza