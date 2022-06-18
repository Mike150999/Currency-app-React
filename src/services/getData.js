import axios from 'axios';

export const getData = () => {
  return axios
    .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then((res) => ({
      USD: res.data.filter((item) => item.cc === 'USD')[0].rate,
      EUR: res.data.filter((item) => item.cc === 'EUR')[0].rate,
    }));
};

