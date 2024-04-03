import { shopping_cart } from '../utils/images';

const CartModal = ({ carts }) => {
  return (
    <div className='cart-modal absolute right-[-10px] top-full bg-gradient-to-br from-transparent via-purple-300 to-transparent w-[360px] shadow-lg border border-gray-500 p-7 invisible overflow-y-hidden'>
      <h5 className='cart-modal-title font-medium text-center text-gray-600 text-lg mb-4'>Recently Added Products</h5>
      {carts?.length > 0 ? (
        <div className='cart-modal-list grid gap-4'>
          {carts.map(cart => (  
            <div key={cart.id} className='cart-modal-item grid items-center py-2 border-b border-gray-200'>
              <div className='cart-modal-item-img'>
                <img src={cart?.thumbnail} alt='' className='w-16 h-16 object-cover' />
              </div>
              <div className='cart-modal-item-title text-sm text-gray-800 capitalize'>{cart?.title}</div>
              {/* <div className='cart-modal-item-price text-orange font-semibold text-lg'>{UseCartContextType(cart?.discountedPrice)}</div> */}
            </div>
          ))}
          <div className='text-center text-orange text-lg py-2 border-b border-gray-200'>
            <button className='view-cart-btn bg-orange text-white font-medium py-2 px-4 rounded-lg'>View My Shopping Cart</button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center text-center cart-modal-empty py-8'>
          <img src={shopping_cart} alt='' className='w-24 h-24 mb-4' />
          <h6 className='text-gray-800 font-normal'>No products yet</h6>
        </div>
      )}
    </div>
  );
};

export default CartModal;