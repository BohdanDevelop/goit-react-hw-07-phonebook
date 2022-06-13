import { createAsyncThunk } from '@reduxjs/toolkit';
import numbers from '../../shared/services/numbers';

const fetchNumbers = createAsyncThunk(
  'contacts/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await numbers.fetchNumbers();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const deleteNumber = createAsyncThunk(
  'contacts/delete',
  async (data, { rejectWithValue }) => {
    try {
      const { data: removedNumber } = await numbers.deleteNumber(data);

      return removedNumber;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const addNumber = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue, getState }) => {
    try {
      const { data: newNumber } = await numbers.addNumber(data);

      return newNumber;
    } catch (error) {
      rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();

      const allTheName = contacts.items.map(elem => elem.name.toUpperCase());
      if (allTheName.includes(data.name.toUpperCase())) {
        alert(`${data.name} is already in contacts`);
        return false;
      }
    },
  }
);

const functions = {
  fetchNumbers,
  deleteNumber,
  addNumber,
};

export default functions;
