import React from 'react'
import CurverCard from '../MainCurveCard'
import Button from '../../stories/button/Button'
import './style.css'

interface INotification {
    notification : { id: number; message: string; count: number }[]
}

const Notifications = ({ notification }: INotification) => {
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
        onClick={() => {}}
        color=' #0066FF'
        className="ignore-btn"
      />
      <Button
      label={'show'}
      onClick={() => {}}
      className="show-btn"/>
    </div>
  </CurverCard>
  )
}

export default Notifications
