import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { IconComponent } from '~/components/IconComponent';
import { MainComponent } from '~/components/MainComponent';
import { SkeletonComponent } from '~/components/SkeletonComponent';
import { WeatherCardComponent } from '~/components/WeatherCardComponent';
import { FORMAT_DAY_MONTH, FORMAT_HOUR_MINUTE } from '~/constants';
import { useCurrentCity } from '~/hooks/useCurrentCity';
import { useForecast } from '~/hooks/useForecast';
import { useWeather } from '~/hooks/useWeather';
import type {
  ForecastParams,
  WeatherDetail,
  WeatherItem,
} from '~/types/Forecast';
import { getName } from '~/utils';
import {
  formatWeatherCardItem,
  getWeatherIcon,
  getWeatherTemperature,
} from '~/utils/weather';
import type { Route } from './+types/home';

dayjs.extend(isToday);

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

let tmpDate = '';
export default function HomePage() {
  const { currentCity } = useCurrentCity();
  const [list, setList] = useState<WeatherItem[]>([]);
  const { loading, fetchForecast } = useForecast();
  const [weatherData, setWeatherData] = useState<WeatherDetail>();
  const { loading: loadingWeather, fetchWeather } = useWeather();

  const hasData = useMemo(() => !!weatherData || !!list.length, [weatherData]);

  useEffect(() => {
    if (!currentCity) {
      return;
    }
    (async () => {
      const params: ForecastParams = {
        ...currentCity?.coord,
        units: 'metric',
        cnt: new Date().getTime(),
      };
      const [{ data }, { data: dataWeather }] = await Promise.all([
        fetchForecast(params),
        fetchWeather(params),
      ]);
      if (data) {
        const { list } = data;
        setList(list);
      }
      if (dataWeather) {
        setWeatherData(dataWeather);
      }
    })();
  }, [currentCity]);

  return (
    <MainComponent
      headerTitle={getName(currentCity)}
      headerLeftComponent={<IconComponent name="location" />}
      headerRightComponent={
        <a href="/search" className="outline-none">
          <IconComponent name="search" />
        </a>
      }
    >
      {hasData && (
        <>
          <WeatherCardComponent
            item={formatWeatherCardItem(weatherData)}
            className="mb-5"
          />
          {!!list.length && (
            <>
              <SkeletonComponent loading={loading}>
                <h4 className="text-gray-700 text-base font-semibold mb-2">
                  5-day Forecast (3 Hours)
                </h4>
              </SkeletonComponent>
              <div className="bg-white p-5 rounded-lg shadow-2xl shadow-neutral-200">
                {list.map((item) => {
                  const dayjsTime = dayjs(item.dt * 1000);
                  const date = dayjsTime.format(FORMAT_DAY_MONTH);
                  const isShow = tmpDate !== date;
                  tmpDate = date;

                  const { time, temp_min, temp_max, status, icon } = {
                    time: dayjsTime.format(FORMAT_HOUR_MINUTE),
                    temp_min: getWeatherTemperature(item.main.temp_min),
                    temp_max: getWeatherTemperature(item.main.temp_max),
                    status: item.weather?.[0]?.description,
                    icon: getWeatherIcon(item.weather?.[0]?.icon),
                  };
                  return (
                    <Fragment key={`${item.dt}`}>
                      {isShow && (
                        <p className="title text-base text-gray-400 font-semibold mb-2 [&~&]:mt-8">
                          {dayjsTime.isToday() ? 'Today' : date}
                        </p>
                      )}
                      <div className="py-2 flex gap-4 items-center">
                        {time}
                        <div className="flex gap-2 items-center flex-1 min-w-0">
                          <IconComponent src={icon} size={40} />
                          <p
                            className="text-neutral-400"
                            dangerouslySetInnerHTML={{
                              __html: `${temp_min} / ${temp_max}`,
                            }}
                          />
                        </div>
                        <p className="m-0">{status}</p>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </MainComponent>
  );
}
