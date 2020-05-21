import * as actionTypes from './actionTypes'

export const setPhotoData = (data, index) => {
  return {
    type: actionTypes.SET_PHOTO_DATA,
    data: data,
    index: index,
  }
}