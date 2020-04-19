import { get, post } from './http.js';

const Rnd = () => {
  return Math.floor(Math.random() * 100)
}

const GetUserPointRule = data => {
  return get('api/UserBase/GetUserPointRule', data);
}

const GetUserPoingLog = data => {
  return get('api/UserBase/GetUserPoingLog', data);
}

const GetUserNews = data => {
  return get('api/UserBase/GetUserNews', data);
}

const UpdateuserNews = data => {
  return post('api/UserBase/UpdateuserNews', data);
}

const GetActiveList = data => {
  return get('api/Active/GetActiveList', data);
}

const GetActiveInfo = data => {
  return get('api/Active/GetActiveInfo', data);
}

const GetUserCollection = data => {
  return get('api/UserBase/GetUserCollection', data);
}
const GetUserLiaison = data => {
  return get('api/UserBase/GetUserLiaison', data);
}

const GetSMSCode = data => {
  return get('api/Lib/GetSMSCode', data);
}

const GetUserBindMobileChange = data => {
  return get('api/UserBase/GetUserBindMobileChange', data);
}

const GetDeleteLiaison = data => {
  return get('api/UserBase/GetDeleteLiaison', data);
}


const GetAddChangeLiaison = data => {
  return get('api/UserBase/GetAddChangeLiaison', data);
}


const GetAddUserAddress = data => {
  return get('api/UserBase/GetAddUserAddress', data);
}

const GetUserAddress = data => {
  return get('api/UserBase/GetUserAddress', data);
}

const GetUserAddressDel = data => {
  return get('api/UserBase/GetUserAddressDel', data);
}

const GetAddressInfo = data => {
  return get('api/UserBase/GetAddressInfo', data);
}
const GetSetDefalut = data => {
  return get('api/UserBase/GetSetDefalut', data);
}

const GetSignInList = data => {
  return get('api/UserBase/GetSignInList', data);
}

const GetSignIn = data => {
  return get('api/UserBase/GetSignIn', data);
}

const GetUserGuanZhu = data => {
  return get('api/UserBase/GetUserGuanZhu', data);
}


const GetUserFans = data => {
  return get('api/UserBase/GetUserFans', data);
}

const GetUserPage = data => {
  return get('api/UserBase/GetUserPage', data);
}


const GetFanKuiType = data => {
  return get('api/Lib/GetFanKuiType', data);
}


const GetSetFreeBack = data => {
  return get('api/Lib/GetSetFreeBack', data);
}


const GetUserNewsCount = data => {
  return get('api/UserBase/GetUserNewsCount', data);
}


const GetUserNewsInfo = data => {
  return get('api/UserBase/GetUserNewsInfo', data);
}



const GetOrderList = data => {
  return get('api/Orders/GetOrderList', data);
}


const GetUserActive = data => {
  return get('api/ActiveOrder/GetUserActive', data);
}

const GetUserSign=data => {
  return get('api/ActiveOrder/GetUserSign', data);
}

const GetPanDuanFirst = data => {
  return get('api/UserBase/GetPanDuanFirst', data);
}


const GetDeleteDaily = data => {
  return get('api/ALog/GetDeleteDaily', data);
}
const GetOrderInfo = data => {
  return get('api/Orders/GetOrderInfo', data);
}


const GetLogisticsInformation = data => {
  return get('api/Orders/GetLogisticsInformation', data);
}


const GetConfirmReceiptProduct = data => {
  return get('api/Orders/GetConfirmReceiptProduct', data);
}


const GetEnrollInfo = data => {
  return get('api/ActiveOrder/GetEnrollInfo', data);
}

const GetApplyForRefundsMoney = data => {
  return get('api/Orders/GetApplyForRefundsMoney', data);
}
const GetMyApplyForRefunds = data => {
  return get('api/Orders/GetMyApplyForRefunds', data);
}
const GetApplyForRefunds = data => {
  return get('api/Orders/GetApplyForRefunds', data);
}
const GetRefundReasonList = data => {
  return get('api/Orders/GetRefundReasonList', data);
}
const GetMyApplyForRefundsDetails = data => {
  return get('api/Orders/GetMyApplyForRefundsDetails', data);
}
const GetCancelRequest = data => {
  return get('api/Orders/GetCancelRequest', data);
}
const GetExpressList = data => {
  return get('api/Orders/GetExpressList', data);
}
const GetGetExpressOrderNumber = data => {
  return get('api/Orders/GetGetExpressOrderNumber', data);
}
export { 
  GetUserSign,
  Rnd,
  GetUserPoingLog,
  GetUserNews,
  GetUserPointRule,
  UpdateuserNews,
  GetActiveList,
  GetActiveInfo,
  GetUserLiaison,
  GetSMSCode,
  GetUserBindMobileChange,
  GetDeleteLiaison,
  GetAddChangeLiaison,
  GetAddUserAddress,
  GetUserAddress,
  GetUserAddressDel,
  GetAddressInfo,
  GetSetDefalut,
  GetSignInList,
  GetSignIn,
  GetUserGuanZhu,
  GetUserFans,
  GetUserPage,
  GetFanKuiType,
  GetSetFreeBack,
  GetUserNewsCount,
  GetUserNewsInfo,
  GetUserCollection,
  GetOrderList,
  GetUserActive,
  GetPanDuanFirst,
  GetDeleteDaily,
  GetOrderInfo,
  GetLogisticsInformation,
  GetConfirmReceiptProduct,
  GetEnrollInfo,
  GetApplyForRefundsMoney,
  GetMyApplyForRefunds,
  GetApplyForRefunds,
  GetRefundReasonList,
  GetMyApplyForRefundsDetails,
  GetCancelRequest,
  GetExpressList,
  GetGetExpressOrderNumber

}

