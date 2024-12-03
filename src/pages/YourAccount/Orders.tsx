/* eslint-disable @typescript-eslint/no-explicit-any */
import { DetailsWrap, OrderWrap, PlacedWrap, ProfileWrapper } from './styles';
import airplane from '../../assets/images/airplane.svg';
// import arrow from '../../assets/icons/arrow_right.svg';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import Button from '../../stories/button/Button';
import { useState } from 'react';

interface IOrders {
  orderData: any;
}
const Orders = (props: IOrders) => {
  const { orderData } = props;

  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const toggleOrderFiles = (orderId: any) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId)); // Toggle visibility
  };
  console.log(orderData);
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
      {orderData?.map((item: any) => (
        <PlacedWrap isOpen={expandedOrderId === item._id ? true : false}>
          <section className="orderPlaced">
            <div className="card-container">
              <div className="card card-1">Card 1</div>
              <div className="card card-2">Card 2</div>
              <div className="card card-3">
                <img src={airplane} />
              </div>
            </div>
            <span className="orderDetails">
              <span
                className="orderInfo"
                onClick={() => toggleOrderFiles(item._id)}
              >
                <span>
                  <p>Order</p>
                  <p className="info">{item._id}</p>
                </span>
                <span className="arrow">
                  <p>{item.order_status}</p>
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
          {expandedOrderId === item._id && (
            <>
              {item.files.length > 0 ? (
                item.quote[0].files.map((item: any) => (
                  <DetailsWrap>
                  <span className="img">
                    <img src={airplane} />
                  </span>
                  <span className="details">
                    <span>
                      <p>{item.fileName}</p>
                    </span>
                    <span>
                      <p>Quantity</p>
                      <span className="data">{item.quantity}</span>
                    </span>
                    <span>
                      <p>Pricing</p>
                      <span className="data">${item.totalPrice}</span>
                    </span>
                  </span>
                </DetailsWrap>
                ))
              ) : (
                <p className='no-order' >No files available for this order.</p>
              )}
            </>
          )}
        </PlacedWrap>
      ))}
    </ProfileWrapper>
  );
};

export default Orders;
