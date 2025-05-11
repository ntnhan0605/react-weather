import clsx from 'clsx';
import type {
  CSSProperties,
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from 'react';
import type { DataAttributes, Size } from '~/types';
import { IconComponent } from '../IconComponent';

const PREFIX = 'Button';

export type ButtonComponentProps = {
  href?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  animated?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
} & DataAttributes;
export const ButtonComponent: FC<PropsWithChildren<ButtonComponentProps>> = ({
  href,
  htmlType,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  onClick,
  animated = false,
  icon,
  children,
  className,
  ...props
}) => {
  const iconComp = loading ? (
    <span className={`${PREFIX}_icon ${PREFIX}_icon_loading`}>
      <IconComponent name="loading" className="text-2xl" />
    </span>
  ) : (
    !!icon && <span className={`${PREFIX}_icon`}>{icon}</span>
  );

  const childrenComp = (
    <>
      {iconComp}
      {children && <span className={`${PREFIX}_text`}>{children}</span>}
    </>
  );
  const classNameButton = clsx(
    className,
    `${PREFIX} ${PREFIX}_${size} ${PREFIX}_${variant}`,
    'inline-flex gap-1 items-center justify-center',
    'border border-solid border-transparent ',
    'transition-all ease-in-out duration-200 cursor-pointer',
    'disabled:pointer-events-none disabled:cursor-not-allow',
    {
      'py-2 px-10 text-sm rounded-sm': size === 'sm',
      'py-2 px-12 text-md rounded-md': size === 'md',
      'py-2 px-14 text-lg rounded-lg': size === 'lg',
      'bg-blue-500 text-white hover:bg-blue-600 hover:border-blue-700':
        variant === 'primary',
      'bg-transparent border-blue-300 text-blue-500 hover:border-blue-700 hover:text-blue-700':
        variant === 'secondary',
      'bg-transparent border-gray-300 text-gray-300': variant === 'ghost',
      'bg-transparent border-gray-300 text-gray-700': variant === 'outline',
      'bg-transparent p-0 text-gray-800 leading-normal hover:text-gray-400':
        variant === 'link',
      'p-0 w-8 h-8': !!icon,
    }
  );

  if (href && !disabled) {
    return (
      <a {...props} href={href} className={classNameButton}>
        {childrenComp}
      </a>
    );
  }
  return (
    <button
      {...props}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      type={htmlType}
      className={classNameButton}
    >
      {childrenComp}
    </button>
  );
};
