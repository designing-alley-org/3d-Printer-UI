import CurverCard from '../MainCurveCard'
import Button from '../../stories/button/Button'
import './style.css'
import { useNavigate } from 'react-router-dom'

interface INotification {
  notification: { id: number; message: string; count: number }[]
  setShowNotification: (value: boolean) => void
}

const Notifications = ({ notification, setShowNotification }: INotification) => {


  const navigate = useNavigate();

  const navigateToNotification = () => {
    navigate('/notification')
    setShowNotification(false)
  };

  return (
    <CurverCard className='notificationCard'>
      <div className='notificationWarper'>
        <span className='notificationNumber'>{notification.length}</span>
        <p>New Notifications</p>
        <div className='notificationList'>
          {notification.map((item, index) => (
            <div key={index} className="notificationItem">
              <div className='notificationContent'>
                <p> {item.message}</p>
                <span> {item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='button'>
        <Button
          label="ignore"
          onClick={() => { setShowNotification(false) }}
          color=' #0066FF'
          className="ignore-btn"
        />
        <Button
          label={'show'}
          onClick={() => { navigateToNotification() }}
          className="show-btn"
        />
      </div>
    </CurverCard>
  )
}

export default Notifications
