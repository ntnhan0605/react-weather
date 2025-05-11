import dayjs from 'dayjs';
import type { WeatherCardItem } from '~/components/WeatherCardComponent';
import { FORMAT_DAY_FULL } from '~/constants';
import type { WeatherDetail } from '~/types/Forecast';
import { mathRound } from '.';

export const getWeatherIcon = (icon?: string) => {
  // Example: https://openweathermap.org/img/wn/03n@2x.png
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const getWeatherTemperature = (temp?: number) => {
  return `${temp}<span className="text-sm"><sup>o</sup>C</span>`;
};

export const formatWeatherCardItem = (
  item?: WeatherDetail
): WeatherCardItem | undefined => {
  if (!item) {
    return;
  }

  const { dt, weather, main, visibility, wind } = item;
  const currWeather = weather?.[0];

  return {
    day: dayjs(dt * 1000).format(FORMAT_DAY_FULL),
    icon: getWeatherIcon(currWeather?.icon),
    status: currWeather?.main,
    temperature: getWeatherTemperature(main.temp),
    humidity: main.humidity,
    wind: wind.speed,
    visibility: mathRound(visibility / 1000),
  };
};
