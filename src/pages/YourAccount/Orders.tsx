/* eslint-disable @typescript-eslint/no-explicit-any */
import { DetailsWrap, OrderWrap, PlacedWrap, ProfileWrapper } from './styles';
import airplane from '../../assets/images/airplane.svg';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import Button from '../../stories/button/Button';
import { useState } from 'react';
import Pagin from '../../components/Paging/Pagin';

interface IOrders {
  orderData: {
    totalCount: number;
    totalPages: number;
    order: Array<{
      _id: string;
      order_status: string;
      files: Array<any>;
      quote: Array<{
        files: Array<{
          fileName: string;
          quantity: number;
          totalPrice: number;
        }>;
      }>;
    }>;
  };
  setPagination: (pageNum: number) => void;
}

const Orders = ({ orderData, setPagination }: IOrders) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrderFiles = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const formatOrderStatus = (status: string): string => {
    return status
      .toLowerCase()
      .replace('order_', '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <ProfileWrapper>
      <h1>ORDERS IN CHAT</h1>
      <OrderWrap>
        <section className="orders">
          <div className="card-container">
            <div className="card card-1">Card 1</div>
            <div className="card card-2">Card 2</div>
            <div className="card card-3">
              <img src={airplane} alt="Airplane icon" />
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
              <Button 
                label="Quote" 
                onClick={() => console.log('Quote button clicked')} 
              />
            </span>
          </span>
        </section>
      </OrderWrap>
      
      <h1 className="placed">ORDERS PLACED BY YOU : {orderData?.totalCount}</h1>
      
      {orderData?.order?.map((item) => (
        <PlacedWrap key={item._id} isOpen={expandedOrderId === item._id}>
          <section className="orderPlaced">
            <div className="card-container">
              <div className="card card-1">Card 1</div>
              <div className="card card-2">Card 2</div>
              <div className="card card-3">
                <img src={airplane} alt="Airplane icon" />
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
                  <img src={arrow} alt="Expand arrow" />
                </span>
              </span>
              <div className="delivery">
                <div>
                  <p>Delivery</p>
                  <p className="info">12/01/2024</p>
                </div>
                <Button
                  label={formatOrderStatus(item.order_status)}
                  onClick={() => console.log(`Order status: ${item.order_status}`)}
                />
              </div>
            </span>
          </section>
          
          {expandedOrderId === item._id && (
            <>
              {item.quote?.[0]?.files?.length > 0 ? (
                item.quote[0].files.map((file, index) => (
                  <DetailsWrap key={`${item._id}-file-${index}`}>
                    <span className="img">
                      <img src={airplane} alt="Airplane icon" />
                    </span>
                    <span className="details">
                      <span>
                        <p>{file.fileName}</p>
                      </span>
                      <span>
                        <p >Quantity</p>
                        <span className="data">{file.quantity}</span>
                      </span>
                      <span>
                        <p>Pricing</p>
                        <span className="data">${file.totalPrice}</span>
                      </span>
                    </span>
                  </DetailsWrap>
                ))
              ) : (
                <p className="no-order">No files available for this order.</p>
              )}
            </>
          )}
        </PlacedWrap>
      ))}
      
      <div className="pagination">
        <Pagin totalPages={orderData?.totalPages} setPagination={setPagination} />
      </div>
    </ProfileWrapper>
  );
};

export default Orders;