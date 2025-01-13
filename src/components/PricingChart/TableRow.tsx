import { Ruler, Cpu, Box, Palette, Printer, Percent } from 'lucide-react';
import type { PricingDetailType } from '../../types';
import styles from './TableRow.module.css';


const IconMap = {
  ruler: Ruler,
  cpu: Cpu,
  box: Box,
  palette: Palette,
  printer: Printer,
  percent: Percent,
};

interface TableRowProps {
  detail: PricingDetailType;
}

export function TableRow({ detail }: TableRowProps) {
  const Icon = IconMap[detail.icon as keyof typeof IconMap];
  
  return (
    <div className={styles.row}>
      <div className={`${styles.cell} ${styles.iconCell}`}>
        <Icon className={styles.icon} />
        <span>{detail.label}</span>
      </div>
      <div className={styles.cell}>{detail.value}</div>
      <div className={`${styles.cell} ${styles.price}`}>${detail.pricePerUnit}/m³</div>
      <div className={`${styles.cell} ${styles.price}`}>${detail.total}</div>
    </div>
  );
}