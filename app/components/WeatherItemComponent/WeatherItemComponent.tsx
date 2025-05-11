import type { FC } from 'react';

export type WeatherItem = {
  day: string;
  icon: string;
  status: string;
  temperature: number;
  humidity: number;
  wind: string;
  visibility: number;
};

export type WeatherItemComponentProps = {
  item?: WeatherItem;
};
export const WeatherItemComponent: FC<WeatherItemComponentProps> = (props) => {
  return <></>;
};
