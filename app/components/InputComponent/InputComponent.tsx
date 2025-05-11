import clsx from 'clsx';
import {
  forwardRef,
  type CSSProperties,
  type DetailedHTMLProps,
  type ForwardRefRenderFunction,
  type InputHTMLAttributes,
} from 'react';

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
  rootClassName?: string;
  rootStyle?: CSSProperties;
};
const InputWithoutRef: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (props, ref) => {
  const {
    error,
    rootClassName: rootClassNameProps,
    rootStyle,
    className,
    ...inputProps
  } = props;

  const rootClassName = clsx(rootClassNameProps, 'w-full');
  const inputClassName = clsx(
    className,
    'w-full py-2 px-4',
    'bg-white border border-solid border-gray-300 rounded-md outline-none',
    'focus:border-blue-300'
  );

  return (
    <div className={rootClassName} style={rootStyle}>
      <input {...inputProps} ref={ref} className={inputClassName} />
      {!!error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
};

export const InputComponent = forwardRef(InputWithoutRef);
