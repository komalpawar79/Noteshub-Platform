import { cn } from '@/lib/utils';

export function Button({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };

  return (
    <button
      className={cn(
        'px-6 py-2 rounded-lg font-medium transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
