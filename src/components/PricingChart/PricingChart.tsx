import './pricingChart.css';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { Summary } from './Summary';
import type { PricingDetailType } from '../../types';

interface PricingChartProps {
  details: PricingDetailType[];
  quantity: number;
  taxes: number;
  total: number;
}

export function PricingChart({ details, quantity, taxes, total }: PricingChartProps) {
  return (
    <div className="pricing-chart">
      <TableHeader />
      
      {details.map((detail, index) => (
        <TableRow key={index} detail={detail} />
      ))}
      
      <Summary quantity={quantity} taxes={taxes} total={total} />
    </div>
  );
}