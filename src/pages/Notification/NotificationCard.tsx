import Button from '../../stories/button/Button';
import { NotificationWarper, Data } from './styles';
import airplane from '../../assets/images/airplane.svg';
import { arrowRight } from '../../constants';

interface NotificationCardProps {
    title: string;
    orderNumber: string;
    dateTime: string;
    buttonLabel: string;
    status?: string;
    onButtonClick?: () => void;
    myOrders?: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ 
    title, 
    orderNumber, 
    dateTime, 
    buttonLabel, 
    onButtonClick ,
    status,
    myOrders

}) => {
    return (
        <NotificationWarper>
            <div className="model">
                <span className="modelView">
                    <img src={airplane} alt="" />
                </span>
            </div>
            <Data>
                <div className="title">{title}</div>
                <div className="description">
                    <div>
                        <p>ORDER NO. <span>{orderNumber}</span></p>
                        <p>DATE & TIME <span>{dateTime}</span></p>
                    </div>
                </div>
            </Data>
            <div className="btn">
                <Button
                    label={buttonLabel}
                    onClick={() => onButtonClick && onButtonClick()} 
                    className='btn-icon'
                >
                        <img src={arrowRight} alt="" />
                </Button>
                { status && <Button
                    label={status == "Resolved" ? "Closed" : "InProgress"}
                    style={{backgroundColor: status === "Resolved" ? 'rgb(244, 68, 68)' : 'rgb(93, 214, 93)'}}
                    onClick={() => onButtonClick && onButtonClick()}
                    className='btn-status'
                />}
                {
                    myOrders && <Button
                    label={myOrders.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace("Order", "")}
                    style={{backgroundColor:"rgb(93, 151, 214)"}}
                    onClick={() => onButtonClick && onButtonClick()}
                    className='btn-status'
                />
                }
            </div>
        </NotificationWarper>
    );
};
