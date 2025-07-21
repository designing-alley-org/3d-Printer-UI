import Button from '../../stories/button/Button';
import airplane from '../../assets/images/airplane.svg';
import { arrowRight } from '../../constants';
import { Data, NotificationWarper } from './styles';

interface NotificationCardProps {
  title: string;
  orderNumber: string;
  dateTime: string;
  buttonLabel: string;
  status?: string;
  placeOrderStatus?: string;
  onButtonClick?: () => void;
  myOrders?: string;
  isUnread?: boolean; // New prop for unread status
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  orderNumber,
  dateTime,
  buttonLabel,
  onButtonClick,
  status,
  myOrders,
  placeOrderStatus,
  isUnread, // Receiving isUnread prop
}) => {
  return (
    <NotificationWarper>
      <div className="model">
        <span className="modelView">
          <img src={airplane} alt="" />
        </span>
      </div>
      <Data>
        <div className="title">
          {title}
          {isUnread && (
            <span
              style={{
                background: 'blue',
                height: '10px',
                width: '10px',
                borderRadius: '50%',
                display: 'inline-block',
                marginLeft: '8px',
              }}
            ></span>
          )}
        </div>

        <div className="description">
          <div>
            <p>
              ORDER NO. <span>{orderNumber}</span>
            </p>
            <p>
              DATE & TIME <span>{dateTime}</span>
            </p>
          </div>
        </div>
      </Data>
      <div className="btn">
        <Button
          label={buttonLabel}
          onClick={() => onButtonClick && onButtonClick()}
          className="btn-icon"
        >
          <img src={arrowRight} alt="" />
        </Button>
        {placeOrderStatus && (
           <Button
           label={` ${placeOrderStatus === 'Success' ? 'Successful' : 'Failed'}`}
           style={{
             backgroundColor:
             placeOrderStatus === 'Success' ? 'rgb(93, 214, 93)': 'rgb(244, 68, 68)',
           }}
           className="btn-status"
         />
        )}
        {status && (
          <Button
            label={status === 'Resolved' ? 'Closed' : 'InProgress'}
            style={{
              backgroundColor:
                status === 'Resolved' ? 'rgb(244, 68, 68)' : 'rgb(93, 214, 93)',
            }}
            className="btn-status"
          />
        )}
        {myOrders && (
          <Button
            label={myOrders
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
              .replace('Order', '')}
            style={{ backgroundColor: 'rgb(93, 151, 214)' }}
            onClick={() => onButtonClick && onButtonClick()}
            className="btn-status"
          />
        )}
      </div>
    </NotificationWarper>
  );
};