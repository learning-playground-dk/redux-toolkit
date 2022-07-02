import Navbar from './components/Navabar';
import Modal from './components/Modal';
import CartContainer from './components/CartContainer';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
