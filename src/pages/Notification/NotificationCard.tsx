import Button from '../../stories/button/Button';
import { NotificationWarper, Data } from './styles';
import airplane from '../../assets/images/airplane.svg';
import { arrowRight } from '../../constants';

interface NotificationCardProps {
    title: string;
    orderNumber: string;
    dateTime: string;
    buttonLabel: string;
    onButtonClick?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ 
    title, 
    orderNumber, 
    dateTime, 
    buttonLabel, 
    onButtonClick 
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
            </div>
        </NotificationWarper>
    );
};
