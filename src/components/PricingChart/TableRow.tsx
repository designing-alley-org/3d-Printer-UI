import { Ruler, Cpu, Box, Palette, Printer, Percent, StretchHorizontal,Weight } from 'lucide-react';
import type { PricingDetailType } from '../../types';
import styles from './TableRow.module.css';

const IconMap = {
  ruler: Ruler,
  cpu: Cpu,
  box: Box,
  palette: Palette,
  printer: Printer,
  percent: Percent,
  StretchHorizontal: StretchHorizontal,
  weight:Weight
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
      <div className={styles.cell}>{detail.value || 'N/A'}</div>
    </div>
  );
}