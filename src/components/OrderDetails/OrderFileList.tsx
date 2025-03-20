import { OrderFile } from '../OrderFiles/OrderFile';
import './OrderFileList.css'; // Import the CSS file

interface IselectedOrder {
  files:{
    fileName: string;
    quantity: number;
    pricing: number;
  }[]
  };


export function OrderFilesList({  files }: IselectedOrder) {
 
  return (
    <div className="order-files-list">
        <h3 className="order-files-title">Order Files</h3>
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
