import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Card({ children, className, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(255, 102, 0, 0.2)' }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-white rounded-xl shadow-md p-6 border border-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
