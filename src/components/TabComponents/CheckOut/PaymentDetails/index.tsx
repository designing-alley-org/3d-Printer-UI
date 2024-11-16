import Button from '../../../../stories/button/Button';
import { Body, Price, Wrapper } from './styles';

const PaymentDetails = () => {
  const elementsArray = Array(5).fill(null);

  return (
    <Wrapper>
      <header>
        <h1>Payment</h1>
        <h3>Edit Your Files As much as you want</h3>
        <h3 className="desc">
          Set the required quantities for each file and if their sizes appear
          too small, change the unit of measurement to inches. Click on 3D
          Viewer for a 360° preview of your files.
        </h3>
      </header>
      <Body>
        <div className="files">
          <h2>Files</h2>
          <span className="file">
            {elementsArray.map((_, index) => (
              <span key={index} className="fileName">
                <span className="dot">.</span>Name of file
              </span>
            ))}
          </span>
        </div>
        <div className="address">
          <h2>Shipping Address</h2>
          <span>
            Name:poorvaGayake Companymeca Addresskothrud Pune Maharashtra 411038
            IN
          </span>
        </div>
        <div className="details">
          <h2>Billing Details</h2>
          <Price>
            <div>
              <span className="priceDetail">
                <span>Price</span>
                <span className="price">$40</span>
              </span>
              <span className="priceDetail">
                <span>Accurred bonus</span>
                <span className="price">$40</span>
              </span>
            </div>
            <div>
              <span className="priceDetail">
                <span>Print fee</span>
                <Button label="Invoice" onClick={Function}></Button>
              </span>
              <span className="priceDetail">
                <span className="total">Total</span>
                <span className="price">$80</span>
              </span>
            </div>
          </Price>
        </div>
      </Body>
    </Wrapper>
  );
};

export default PaymentDetails;
