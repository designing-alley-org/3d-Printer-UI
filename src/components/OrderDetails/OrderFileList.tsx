import { Box } from '@mui/material';
import { OrderFile } from '../OrderFiles/OrderFile';
import './OrderFileList.css'; // Import the CSS file

interface IselectedOrder {
  files:{
    fileName: string;
    quantity: number;
    pricing: number;
  }[];
  payment?: string;
  };


export function OrderFilesList({  files,payment }: IselectedOrder) {
 
  return (
    <div className="order-files-list">
      <span style={{display:'flex',justifyContent:'space-between'}}>
        <h3 className="order-files-title">Order Files</h3>
        {
        payment && 
          <h3 className="order-files-title">Payment: ${parseFloat(payment).toFixed(2)}</h3>
        }
        </span>

        <div className="order-files-space">
          {files?.length === 0 && <p className='no-files'>No files found</p>}
          {files?.map((file,index:number) => (
            <OrderFile
              key={index}
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
