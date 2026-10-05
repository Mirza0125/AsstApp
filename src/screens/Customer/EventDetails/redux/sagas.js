import {all, call, put, takeLatest} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// config
import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

export default all([takeLatest()]);
