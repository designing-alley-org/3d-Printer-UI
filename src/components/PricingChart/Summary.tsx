import type { PricingSummaryType } from '../../types';
import './summary.css';

export function Summary({ quantity, taxes, total }: PricingSummaryType) {
  return (
    <div className="summary-container">
      <div className="summary-item">
        <span className="summary-label">Total Print Pricing</span>
        <span className="summary-value">${total - taxes}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Quantity</span>
        <span className="summary-value">{quantity} Units</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Taxes</span>
        <span className="summary-value">${taxes}</span>
      </div>
      <div className="summary-total">
        <span>TOTAL</span>
        <span className="summary-value">${total}</span>
      </div>
    </div>
  );
}