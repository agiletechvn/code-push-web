import _ from 'lodash';

import * as types from './actionTypes';
import restApi from '../network/RestApi';
import { checkResponseAuth } from './authActions';
import { addShowMsg } from './msgStackActions';

export function requestProducts() {
  return {
    type: types.REQUEST_PRODUCTS
  };
}

export function receiveProducts(data) {
  return {
    type: types.RECEIVE_PRODUCTS,
    payload: data
  };
}

export function getProducts() {
  return dispatch => {
    dispatch(requestProducts());
    return restApi.getProducts().then(data => {
      checkResponseAuth(dispatch, data);
      dispatch(receiveProducts(data));
    });
  };
}

export function showPopAddApp() {
  return { type: types.SHOW_POP_ADD_APP };
}

export function closePopAddApp() {
  return { type: types.CLOSE_POP_ADD_APP };
}

export function popAddAppInput(params) {
  return {
    type: types.POP_ADD_APP_INPUT,
    payload: params
  };
}

export function requestAddProducts() {
  return {
    type: types.REQUEST_ADD_PRODUCTS
  };
}

export function receiveAddProducts(data) {
  return {
    type: types.RECEIVE_ADD_PRODUCTS,
    payload: data
  };
}

export function addProducts(appName, os, platform) {
  return dispatch => {
    dispatch(requestAddProducts());
    return restApi.addProducts(appName, os, platform).then(data => {
      checkResponseAuth(dispatch, data);
      if (_.get(data, 'status') !== 'OK') {
        dispatch(
          addShowMsg('Create an app: ' + _.get(data, 'errorMessage'), 'danger')
        );
      } else {
        dispatch(
          addShowMsg(
            'Create ' + _.get(data, 'results.app.name') + ' app successfully',
            'success'
          )
        );
      }
      dispatch(receiveAddProducts(data));
      dispatch(getProducts());
    });
  };
}

export function requestDeployments(appName) {
  return {
    type: types.REQUEST_PRODUCTS_DEPLOYMENTS,
    payload: appName
  };
}

export function receiveDeployments(appName, data) {
  return {
    type: types.RECEIVE_PRODUCTS_DEPLOYMENTS,
    payload: { appName, ...data }
  };
}

export function fetchDeployments(appName) {
  return dispatch => {
    dispatch(requestDeployments(appName));
    return restApi.getDeployments(appName).then(data => {
      checkResponseAuth(dispatch, data);
      dispatch(receiveDeployments(appName, data));
    });
  };
}
