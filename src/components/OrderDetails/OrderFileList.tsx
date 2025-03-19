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
        <h3 className="order-files-title">Order Files</h3>
        <div className="order-files-space">
          {orderFiles.length === 0 && <p className='no-files'>No files found</p>}
          {orderFiles.map((file,index) => (
            <OrderFile
              key={file?.index}
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
