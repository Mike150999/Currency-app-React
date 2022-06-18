import { useState, useEffect } from 'react';

import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { getData } from '../../services/getData';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    minWidth: '72px',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export const Converter = () => {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('UAH');
  const [data, setData] = useState({});
  const [fromInput, setFromInput] = useState(0);
  const [toInput, setToInput] = useState(0);

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const fromInputHandler = (e) => {
    setFromInput(e.target.value);
    setToInput(e.target.value * data[from]);
  };

  const toInputHandler = (e) => {
    setToInput(e.target.value);
    setFromInput(e.target.value / data[from]);
  };

  useEffect(() => {
    getData().then((res) => setData(res));
  }, []);

  useEffect(() => {
    data[from] && setToInput(fromInput * data[from]);
  }, [from]);

  return (
    <Container>
      <Title>Конвертер валют</Title>
      <Row>
        <CurrencyBox>
          <CurrencyTitle>Курс USD</CurrencyTitle>
          {data.USD && <CurrencyValue color="#f28482">{Number(data.USD).toFixed(2)}</CurrencyValue>}
        </CurrencyBox>
        <CurrencyBox>
          <CurrencyTitle>Курс EUR</CurrencyTitle>
          {data.EUR && <CurrencyValue color="#2a9d8f">{Number(data.EUR).toFixed(2)}</CurrencyValue>}
        </CurrencyBox>
      </Row>

      <InputsRow>
        <FormControl>
          <InputLabel>Введіть значення</InputLabel>
          <BootstrapInput type="number" onChange={fromInputHandler} value={fromInput} />
        </FormControl>
        <FormControl>
          <InputLabel>Валюта</InputLabel>
          <Select value={from} onChange={handleFromChange} input={<BootstrapInput />}>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
        </FormControl>
      </InputsRow>
      <InputsRow>
        <FormControl>
          <InputLabel>Введіть значення</InputLabel>
          <BootstrapInput type="number" value={toInput} onChange={toInputHandler} />
        </FormControl>
        <FormControl>
          <InputLabel>Валюта</InputLabel>
          <Select value={to} onChange={handleToChange} input={<BootstrapInput />}>
            <MenuItem value="UAH">UAH</MenuItem>
          </Select>
        </FormControl>
      </InputsRow>
    </Container>
  );
};

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  max-width: 90%;
  width: 500px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
  margin: auto;
  margin-top: 100px;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
  gap: 20px;
  flex-wrap: wrap;
`;

const CurrencyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 200px;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const CurrencyTitle = styled.h2`
  font-size: 18px;
  text-align: center;
  font-weight: 500;
`;

const CurrencyValue = styled.p`
  font-size: 40px;
  text-align: center;
  color: ${(props) => props.color};
`;

const InputsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 0 20px;
  margin-top: 5px;
`;
