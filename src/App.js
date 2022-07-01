import Navbar from "./components/Navabar";
import Modal from "./components/Modal";
import CartContainer from "./components/CartContainer";
import { calculateTotals } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(store => store.cart.cartItems);
  const { isOpen } = useSelector(store => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
