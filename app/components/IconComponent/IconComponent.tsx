import clsx from 'clsx';
import type { CSSProperties, FC } from 'react';
import { Loading } from './Loading';

export const IconUrl = {
  location: '/icons/location.svg',
  trash: '/icons/trash.svg',
  search: '/icons/search.svg',
  loading: Loading,
};

type IconName = keyof typeof IconUrl;
export type IconComponentProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  size?: number;
  color?: string;
  src?: string;
  name?: IconName;

  iconClassName?: string;
  iconStyle?: CSSProperties;
};
export const IconComponent: FC<IconComponentProps> = (props) => {
  const {
    src,
    name,
    size,
    color,
    onClick,
    className,
    style,
    iconClassName,
    iconStyle,
  } = props;
  const IconComponent = name ? IconUrl[name] || src : src;

  if (!IconComponent) return null;
  return (
    <div
      className={clsx(className, 'w-6 h-6')}
      style={size ? { width: size, height: size, ...style } : { ...style }}
      onClick={onClick}
    >
      {typeof IconComponent === 'string' ? (
        <img
          src={IconComponent}
          color={color}
          className={clsx(iconClassName, 'icon', 'w-full h-full')}
          style={iconStyle}
        />
      ) : (
        <IconComponent />
      )}
    </div>
  );
};
