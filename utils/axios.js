import { get, post, sign, postNoSign, postNoSignArr } from './http.js';

const Rnd = () => {
  return Math.floor(Math.random() * 100)
}
const UserRegister = data => {
  return get('api/UserBase/UserRegister', data);
}
const Getopenid = data => {
  return get('api/WeiXin/Getopenid', data);
}
const GetUserLogin = data => {
  return get('api/UserBase/GetUserLogin', data);
}
const GetHomeBanner = data => {
  return get('api/HomePage/GetHomeBanner', data);
}
const GetRecentActive = data => {
  return get('api/HomePage/GetRecentActive', data);
}
const GetProduct = data => {
  return get('api/HomePage/GetProduct', data);
}
const GetTours = data => {
  return get('api/HomePage/GetTours', data);
}
const GetKBaseList = data => {
  return get('api/KBase/GetKBaseList', data);
}
const GetKBaseSearchList = data => {
  return get('api/KBase/GetKBaseSearchList', data);
}
const GetRedMustKBaseList = data => {
  return get('api/KBase/GetRedMustKBaseList', data);
}
const GetKBaseInfo = data => {
  return get('api/KBase/GetKBaseInfo', data);
}
const GetProductType = data => {
  return get('api/Product/GetProductType', data);
}
const GetProductList = data => {
  return get('api/Product/GetProductList', data);
}
const GetProductInfo = data => {
  return get('api/Product/GetProductInfo', data);
}
const GetProductInfoOrder = data => {
  return get('api/Product/GetProductInfoOrder', data);
}
const PostSubmitOrder = (data,par) => {
  return postNoSignArr('api/Product/PostSubmitOrder'+par, data);
}
const GetAddCollection = data => {
  return get('api/UserBase/GetAddCollection', data);
}
const GetUserAddress = data => {
  return get('api/UserBase/GetUserAddress', data);
}
const GetUserGuanZhu = data => {
  return get('api/UserBase/GetUserGuanZhu', data);
}
const GetAlogList = data => {
  return get('api/ALog/GetAlogList', data);
}
const GetALogInfo = data => {
  return get('api/ALog/GetALogInfo', data);
}
const GetDailyAssess = data => {
  return get('api/ALog/GetDailyAssess', data);
}
const GetKBaseHot = data => {
  return get('api/KBase/GetKBaseHot', data);
}
const GetDeleteHistory = data => {
  return get('api/KBase/GetDeleteHistory', data);
}
const GetSendAlogAdd = data => {
  return get('api/ALog/GetSendAlogAdd', data);
}
const GetActiveList = data => {
  return get('api/Active/GetActiveList', data);
}
const GetSearchActive = data => {
  return get('api/Active/GetSearchActive', data);
}
const GetActiveInfo = data => {
  return get('api/Active/GetActiveInfo', data);
}
const GetMakeActive = data => {
  return get('api/Active/GetMakeActive', data);
}
const PostSendUserAssess = (data,par) => {
  return postNoSign('api/ALog/PostSendUserAssess'+par, data);
}
const PostCustomActive = (data, par) => {
  return post('api/Active/PostCustomActive', data);
}
const GetUserNews = data => {
  return get('api/UserBase/GetUserNews', data);
}
const GetUserDailyList = data => {
  return get('api/UserBase/GetUserDailyList', data);
}
const GetUserPage = data => {
  return get('api/UserBase/GetUserPage', data);
}
const GetDeleteLiaison = data => {
  return get('api/UserBase/GetDeleteLiaison', data);
}
const GetUserLiaison = data => {
  return get('api/UserBase/GetUserLiaison', data);
}
const GetSubmitActive = (data, par) => {
  return get('api/Active/GetSubmitActive', data);
}
const GetActiveType = (data, par) => {
  return get('api/Active/GetActiveType', data);
}

const GetProductChart = data => {
  return get('api/Chart/GetProductChart', data);
}
const GetEditNum = data => {
  return get('api/Chart/GetEditNum', data);
}
const GetDeleteChart = data => {
  return get('api/Chart/GetDeleteChart', data);
}
const GetAddProductCart = data => {
  return get('api/Chart/GetAddProductCart', data);
}
const Getdecryption = data => {
  return get('api/Lib/Getdecryption', data);
}
const GetUserRegister = data => {
  return get('api/UserBase/GetUserRegister', data);
}
const GetUserInvite = data => {
  return get('api/UserBase/GetUserInvite', data);
}

const GetDeleteDaily = data => {
  return get('api/ALog/GetDeleteDaily', data);
}

const GetuserCartAdd = data => {
  return get('api/Chart/GetuserCartAdd', data);
}
export {
  GetuserCartAdd,
  GetUserInvite,
  GetUserRegister,
  Getdecryption,
  GetAddProductCart,
  GetDeleteChart,
  GetProductChart,
  GetEditNum,
  GetSubmitActive,
  GetUserDailyList,
  GetUserPage,
  GetUserNews,
  UserRegister,
  Getopenid,
  GetHomeBanner,
  Rnd,
  GetRecentActive,
  GetProduct,
  GetTours,
  GetKBaseSearchList,
  GetKBaseList,
  GetUserLogin,
  GetRedMustKBaseList,
  GetKBaseInfo,
  GetProductType,
  GetProductList,
  GetProductInfo,
  GetAddCollection,
  GetProductInfoOrder,
  GetUserAddress,
  PostSubmitOrder,
  GetUserLiaison,
  GetDeleteLiaison,
  GetAlogList,
  GetALogInfo,
  GetDailyAssess,
  GetKBaseHot,
  GetDeleteHistory,
  GetUserGuanZhu,
  GetSendAlogAdd,
  PostSendUserAssess,
  sign,
  GetActiveList,
  GetSearchActive,
  GetActiveInfo,
  PostCustomActive,
  GetMakeActive,
  GetActiveType,
  GetDeleteDaily
}