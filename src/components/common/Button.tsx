import React, { forwardRef, ElementType, ReactNode } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost' | string;
  size?: 'sm' | 'md' | 'lg' | string;
  as?: ElementType;
  href?: string;
  className?: string;
  disabled?: boolean;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
  target?: string;
  rel?: string;
  [key: string]: any;
}

/**
 * Shared Button Component
 * Features built-in support for the cursor-following GSAP circular fill hover effect.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    as: Component = 'button',
    href,
    className = '',
    type = 'button',
    disabled = false,
    icon: Icon,
    iconPosition = 'right',
    ...rest
  },
  ref
) {
  const isLink = Boolean(href) || Component === 'a';
  const Element: ElementType = isLink ? 'a' : Component;

  // Determine button variant classes
  const variantClass = variant.startsWith('btn-') ? variant : `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

  const combinedClassName = [
    'btn',
    variantClass,
    sizeClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const elementProps = isLink
    ? { href, ref, className: combinedClassName, ...rest }
    : { type, disabled, ref, className: combinedClassName, ...rest };

  return (
    <Element {...elementProps}>
      {/* Decorative flair element for GSAP cursor-following circular expansion */}
      <span className="button__flair" aria-hidden="true" />
      
      {Icon && iconPosition === 'left' && (
        <Icon className="btn-icon btn-icon-left" aria-hidden="true" />
      )}
      
      {typeof children === 'string' ? (
        <span className="button__label">{children}</span>
      ) : (
        children
      )}

      {Icon && iconPosition === 'right' && (
        <Icon className="btn-icon btn-icon-right" aria-hidden="true" />
      )}
    </Element>
  );
});

export default Button;
