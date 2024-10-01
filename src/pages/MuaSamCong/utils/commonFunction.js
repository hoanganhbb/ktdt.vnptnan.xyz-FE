export function getNameStatus(item) {
  if (item.statusForNotify === 'DHTBMT') return "Đã hủy TBMT";
  if (item.statusForNotify === 'KCNTTT') return "Không có nhà thầu trúng thầu";
  if (item.statusForNotify === 'CNTTT') return "Có nhà thầu trúng thầu";
  if (item.statusForNotify === 'DHT') return "Đã huỷ thầu";
  if (item.statusForNotify === 'DXT') return "Đang xét thầu";
  if (item.statusForNotify === 'VHH') return "Tuyên bố vô hiệu quyết định về KQLCNT";
  if (item.statusForNotify === 'KCN') return "Không công nhận KQLCNT";
  if (item.statusForNotify === 'DC') return "Đình chỉ cuộc thầu";

  if (!item.statusForNotify) {
    if (item.bidCloseDate && new Date(item.bidCloseDate).getTime() > new Date().getTime())
      return "Chưa đóng thầu";
    if (item.bidCloseDate && new Date(item.bidCloseDate).getTime() <= new Date().getTime()) {
      if (item.isInternet === 0) {
        return "Đang xét thầu";
      } else {
        return "Chưa mở thầu";

      }
    }
  }
}

export function getClassStatus(item) {

  if (item.statusForNotify === 'DHTBMT') return "content__body__left__item__infor__notice";
  if (item.statusForNotify === 'KCNTTT') return "content__body__left__item__infor__notice--gray";
  if (item.statusForNotify === 'CNTTT') return "content__body__left__item__infor__notice--blue";
  if (item.statusForNotify === 'DHT') return "content__body__left__item__infor__notice--red";
  if (item.statusForNotify === 'DXT') return "content__body__left__item__infor__notice--orange";
  if (item.statusForNotify === 'VHH') return "content__body__left__item__infor__notice--beige";
  if (item.statusForNotify === 'KCN') return "content__body__left__item__infor__notice--orange--red";
  if (item.statusForNotify === 'DC') return "content__body__left__item__infor__notice--brown";
  if (!item.statusForNotify) {
    if (item.bidCloseDate && new Date(item.bidCloseDate).getTime() <= new Date().getTime() && item.isInternet == 0) {
      return "content__body__left__item__infor__notice--orange";
    } else {
      return "content__body__left__item__infor__notice--be";
    }
  }
}

export function getTextCnttt(item) {
  if (item.contractorName) {
    if (item.contractorName.filter(it => it != null).length > 1) {
      return "(Có nhiều hơn một nhà thầu trúng thầu)"
    } else if (item.contractorName.filter(it => it != null).length === 1) {
      return item.contractorName.filter(it => it != null)[0];
    } else {
      return null;
    }
  }
}

export function getPriceCnttt(item) {
  if (item.bidWinningPrice) {
    if (item.bidWinningPrice.length === 1) {
      return item.bidWinningPrice[0];
    } else {
      return item.bidWinningPrice?.reduce(function (total, current) {
        return total + current;
      }, 0);
    }
  }
}

export function getNameCatByCodeCat(code, listCat) {
  if (!listCat)
    return code;
  const temp = listCat.filter(el => el.code === code).pop();
  return temp ? temp.name : code;
}