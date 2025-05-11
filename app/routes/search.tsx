import { useCallback, useEffect, useState } from 'react';
import { ButtonComponent } from '~/components/ButtonComponent/ButtonComponent';
import { IconComponent } from '~/components/IconComponent';
import { InputComponent, type InputProps } from '~/components/InputComponent';
import { MainComponent } from '~/components/MainComponent';
import { useForecast } from '~/hooks/useForecast';
import Cookies from 'js-cookie';
import { CURRENT_CITY, HISTORY_KEY } from '~/constants';
import { useCurrentCity } from '~/hooks/useCurrentCity';
import { useNavigate } from 'react-router';
import { getName } from '~/utils';
import Skeleton from 'react-loading-skeleton';
import type { CityItem } from '~/types/Forecast';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<CityItem[]>([]);
  const { loading, fetchForecast } = useForecast();
  const { currentCity, setCurrentCity } = useCurrentCity();

  const navigate = useNavigate();

  const onChangeInput = useCallback<NonNullable<InputProps['onChange']>>(
    (e) => {
      setSearch(e.target.value);
    },
    []
  );

  const onSelect = useCallback((city: CityItem) => {
    return async () => {
      setCurrentCity(city);
      await Cookies.set(CURRENT_CITY, JSON.stringify(city));
      navigate('/');
    };
  }, []);

  const onSearch = useCallback(async () => {
    setErrors({});
    const { data, error } = await fetchForecast({ q: search, units: 'metric' });
    if (error) {
      setErrors({ q: error });
    }

    if (data) {
      const { city } = data;
      const newHistory = history.filter((item) => item.id !== city.id);
      newHistory.unshift(city);
      setHistory(newHistory);
      await Cookies.set(HISTORY_KEY, JSON.stringify(newHistory));
      onSelect(city)();
    }
  }, [search, history, onSelect]);

  const onDelete = useCallback(
    (id: number) => {
      return async () => {
        const newHistory = history.filter((item) => item.id !== id);
        if (currentCity?.id === id) {
          setCurrentCity(undefined);
        }
        await Cookies.set(HISTORY_KEY, JSON.stringify(newHistory));
        setHistory(newHistory);
      };
    },
    [history, currentCity]
  );

  useEffect(() => {
    const historyList = (() => {
      try {
        const historyCookie = JSON.parse(Cookies.get(HISTORY_KEY) || '');
        return historyCookie;
      } catch (error) {
        return [];
      }
    })();
    setHistory(historyList);
  }, []);

  return (
    <MainComponent
      headerTitle={loading ? <Skeleton count={1} /> : getName(currentCity)}
      headerLeftComponent={
        <a href="/">
          <IconComponent name="location" />
        </a>
      }
    >
      <div className="flex items-start gap-4">
        <InputComponent
          placeholder="Input search"
          value={search}
          onChange={onChangeInput}
          error={errors.q}
        />
        <ButtonComponent loading={loading} onClick={onSearch}>
          Search
        </ButtonComponent>
      </div>
      {!!history?.length && (
        <>
          <h4 className="text-gray-700 text-base font-semibold mb-2 mt-5">
            Search history
          </h4>
          <div className="bg-white p-5 rounded-lg shadow-2xl shadow-neutral-200">
            {history.map((item) => {
              return (
                <div key={`${item.id}`} className="flex gap-4 py-2">
                  <p className="flex-1 min-w-0">
                    {item.name}, {item.country}
                  </p>
                  <IconComponent
                    name="search"
                    size={20}
                    className="cursor-pointer"
                    onClick={onSelect(item)}
                  />
                  <IconComponent
                    name="trash"
                    size={20}
                    className="cursor-pointer"
                    onClick={onDelete(item.id)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </MainComponent>
  );
}
