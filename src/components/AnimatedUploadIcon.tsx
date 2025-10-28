import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnimatedUploadIcon() {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0], // up 8px then back
      }}
      transition={{
        duration: 1.4, // speed
        repeat: Infinity, // loop forever
        ease: 'easeInOut',
      }}
      style={{
        marginBottom: '16px',
        fontSize: '40px',
        display: 'inline-flex',
      }}
    >
      <Upload strokeWidth={3} color="#c5c2c2ff" />
    </motion.div>
  );
}
