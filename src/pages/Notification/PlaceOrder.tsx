import { NotificationCard } from "./NotificationCard"
import { useState } from 'react'
const PlaceOrder = () => {
    const [card , setCard] = useState<Array<number>>(Array.from({length: 4}, (_, i) => i + 1));
  return (

    <>
    <h2>PLACED ORDER</h2>
    {card.map((item , index) => 
  <NotificationCard key={index} title="Ongoing Order" orderNumber="ORDER NO. 1234567890" dateTime="10TH FEB 2023, 10:30 AM" buttonLabel="open chat" />)  }
    </>
  )
}

export default PlaceOrder