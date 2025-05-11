export type CoordItem = {
  lat: number;
  lon: number;
};

export type CityItem = {
  id: number;
  name: string;
  coord: CoordItem;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type WeatherItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: Record<string, number>;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type WeatherDetail = {
  coord: CoordItem;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: string | number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type ForecastParamsBySearch = {
  q: string;
};

type ForecastParamsByCoordinates = {
  lat: number;
  lon: number;
  units?: 'standard' | 'metric';
  mode?: 'json' | 'xml';
  cnt?: number;
  lang?: string;
};

export type ForecastParams =
  | ForecastParamsByCoordinates
  | ForecastParamsBySearch;

export type ForecaseResponse = {
  data: {
    city: CityItem;
  } | null;
};
