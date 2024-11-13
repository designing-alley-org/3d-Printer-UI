import { OrderWrap, PlacedWrap, ProfileWrapper } from './styles';
import airplane from '../../assets/images/airplane.svg';
// import arrow from '../../assets/icons/arrow_right.svg';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import Button from '../../stories/button/Button';

const Orders = () => {
  return (
    <ProfileWrapper>
      <h1>ORDERS IN CHAT</h1>
      <OrderWrap>
        <section className="orders">
          <span className="img">
            <img src={airplane} />
          </span>
          <span className="details">
            <span>
              <p>Order No.</p>
              <span className="data">#XXXNUNFE984R70</span>
            </span>
            <span>
              <p>Expected Delivery</p>
              <span className="data">12/01/2024</span>
            </span>
            <span>
              <p>IN CHAT STATUS</p>
              <Button label={`Quote`} onClick={Function} />
            </span>
          </span>
        </section>
      </OrderWrap>
      <h1 className="placed">ORDERS PLACED</h1>
      <PlacedWrap>
        <section className="orderPlaced">
          <span className="img">
            <img src={airplane} />
          </span>
          <span className="orderDetails">
            <span className="orderInfo">
              <span>
                <p>Order</p>
                <p className='info'>#XXXNUNFE984R70</p>
              </span>
              <span>
                <p>PAID</p>
                <img src={arrow} />
              </span>
            </span>
            <div className='delivery'>
              <div>
                <p>Delivery</p>
                <p className='info'>12/01/2024</p>
              </div>
              <Button label={`Placed`} onClick={Function} />
            </div>
          </span>
        </section>
      </PlacedWrap>
    </ProfileWrapper>
  );
};

export default Orders;
