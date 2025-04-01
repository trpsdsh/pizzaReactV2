import { CartItem } from '../redux/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartLS = () => {
  const contItemsInLS = localStorage.getItem('cart');
  const items = contItemsInLS ? JSON.parse(contItemsInLS) : [];
  const totalPrice = calcTotalPrice(items);

  return { 
    items: items as CartItem[], 
    totalPrice };
};
