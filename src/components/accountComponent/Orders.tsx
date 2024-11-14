import { DetailsWrap, OrderWrap, PlacedWrap, ProfileWrapper } from './styles';
import airplane from '../../assets/images/airplane.svg';
// import arrow from '../../assets/icons/arrow_right.svg';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import Button from '../../stories/button/Button';
import { useState } from 'react';

const Orders = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ProfileWrapper>
      <h1>ORDERS IN CHAT</h1>
      <OrderWrap>
        <section className="orders">
          <div className="card-container">
            <div className="card card-1">Card 1</div>
            <div className="card card-2">Card 2</div>
            <div className="card card-3">
              <img src={airplane} />
            </div>
          </div>
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
      <PlacedWrap isOpen={isOpen}>
        <section className="orderPlaced">
          <div className="card-container">
            <div className="card card-1">Card 1</div>
            <div className="card card-2">Card 2</div>
            <div className="card card-3">
              <img src={airplane} />
            </div>
          </div>
          <span className="orderDetails">
            <span className="orderInfo" onClick={() => setIsOpen(!isOpen)}>
              <span>
                <p>Order</p>
                <p className="info">#XXXNUNFE984R70</p>
              </span>
              <span className='arrow'>
                <p>PAID</p>
                <img src={arrow} />
              </span>
            </span>
            <div className="delivery">
              <div>
                <p>Delivery</p>
                <p className="info">12/01/2024</p>
              </div>
              <Button label={`Placed`} onClick={Function} />
            </div>
          </span>
        </section>
      </PlacedWrap>
      {isOpen && (
        <DetailsWrap>
          <span className="img">
            <img src={airplane} />
          </span>
          <span className="details">
            <span>
              <p>Name</p>
              <span className="data">size: </span>
            </span>
            <span>
              <p>Quantity</p>
              <span className="data">1</span>
            </span>
            <span>
              <p>Pricing</p>
              <span className='data'>$12</span>
            </span>
          </span>
        </DetailsWrap>
      )}
    </ProfileWrapper>
  );
};

export default Orders;
