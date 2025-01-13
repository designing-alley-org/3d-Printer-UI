import { getOrderById } from '../../store/actions/getOrderById';
import { OrderFileType } from '../../types';
import { OrderFile } from '../OrderFiles/OrderFile';
import './OrderFileList.css'; // Import the CSS file
import { useEffect, useState } from 'react';

interface IselectedOrder {
  selectedOrder: string;
}

export function OrderFilesList({ selectedOrder }: IselectedOrder) {
  const [orderFiles, setOrderFiles] = useState<OrderFileType[]>([]);

  useEffect(() => {
    getOrderById(selectedOrder, setOrderFiles);
  }, []);

  return (
    <div className="order-files-list">
        <h3>Order Files</h3>
        <div className="order-files-space">
          {orderFiles.map((file) => (
            <OrderFile
              key={file.id}
              fileName={file.fileName.split('-')[0]}
              quantity={file.quantity}
              pricing={file.pricing}
              file={file}
            />
          ))}
        </div>
    </div>
  );
}
