import type { FC, PropsWithChildren, ReactNode } from 'react';
import { IconComponent } from '../IconComponent';

export type MainComponentProps = {
  headerTitle?: ReactNode;
  headerLeftComponent?: ReactNode;
  headerRightComponent?: ReactNode;
};
export const MainComponent: FC<PropsWithChildren<MainComponentProps>> = (
  props
) => {
  const { headerTitle, headerLeftComponent, headerRightComponent, children } =
    props;

  return (
    <div className="main">
      <div className="sticky top-0 inset-x-0 z-10 bg-white py-4 shadow-lg shadow-neutral-100">
        <div className="max-w-md mx-auto flex items-center justify-center gap-4">
          {headerLeftComponent}
          <p className="text-md font-semibold flex-1 min-w-0">{headerTitle}</p>
          {headerRightComponent}
        </div>
      </div>
      <div className="bg-blue-50 py-6">
        <div className="max-w-md mx-auto">{children}</div>
      </div>
    </div>
  );
};
