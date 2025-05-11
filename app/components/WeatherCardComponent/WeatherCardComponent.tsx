import clsx from 'clsx';
import type { CSSProperties, FC } from 'react';
import { IconComponent } from '../IconComponent';

export type WeatherCardItem = {
  day: string;
  icon: string;
  status: string;
  temperature: string;
  humidity: number;
  wind: number;
  visibility: number;
};

export type WeatherCardComponentProps = {
  item?: WeatherCardItem;
  className?: string;
  style?: CSSProperties;
};
export const WeatherCardComponent: FC<WeatherCardComponentProps> = (props) => {
  const { item, className, style } = props;

  if (!item) {
    return null;
  }

  return (
    <div
      className={clsx(
        className,
        'bg-white p-5 rounded-lg shadow-2xl shadow-neutral-200'
      )}
      style={style}
    >
      <p className="text-neutral-400 mb-2">{item.day}</p>
      <div className="flex justify-center gap-5 mb-3">
        <IconComponent
          src={item.icon}
          size={110}
          className="!h-18"
          iconClassName="object-cover object-center h-20"
        />
        <div className="flex flex-col items-center justify-center">
          <p
            className="text-5xl text-gray-600 font-semibold tracking-tight"
            dangerouslySetInnerHTML={{ __html: item.temperature }}
          />
          <p className="text-sm text-gray-500 m-0">{item.status}</p>
        </div>
      </div>
      <div className="flex gap-16 justify-center items-start">
        <div className="text-center">
          <p className="text-sm text-neutral-400">Humidity</p>
          <p className="text-lg text-gray-700 font-semibold">
            {item.humidity} <span className="text-sm">%</span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-neutral-400">Winds</p>
          <p className="text-lg text-gray-700 font-semibold">
            {item.wind} <span className="text-sm">m/s</span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-neutral-400">Visibilty</p>
          <p className="text-lg text-gray-700 font-semibold">
            {item.visibility} <span className="text-sm">km</span>
          </p>
        </div>
      </div>
    </div>
  );
};
