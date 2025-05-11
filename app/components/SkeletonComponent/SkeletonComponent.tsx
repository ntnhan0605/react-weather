import type { FC, PropsWithChildren } from 'react';
import Skeleton, { type SkeletonProps } from 'react-loading-skeleton';

export type SkeletonComponentProps = SkeletonProps & {
  loading?: boolean;
};
export const SkeletonComponent: FC<
  PropsWithChildren<SkeletonComponentProps>
> = (props) => {
  const { loading, count = 1, children } = props;

  if (!!loading) {
    return <Skeleton count={count} />;
  }

  return children;
};
