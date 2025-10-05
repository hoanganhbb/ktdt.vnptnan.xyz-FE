export const TYPE_EXAM_XU_LY = 'Xử lý';
export const TYPE_EXAM_THUC_HANH = 'Thực hành';

export function formatCash(str, simple = false) {
  if (str == 'null' || str === null || !str) return '';
  if (simple && str > 1000000000)
    return (str / 1000000000).toFixed(2) + ' tỷ';
  if (simple && str > 1000000)
    return (str / 1000000).toFixed(2) + ' tr';
  return str
    .toString()
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ',') + prev;
    });
}

export const compactNumber = (string) => {
  const suffixs = ['', 'k', 'tr', 'tỷ'];

  const suffixNum = Math.floor(("" + string).length / 3);
  let shortValue = parseFloat((suffixNum != 0 ? (string / Math.pow(1000, suffixNum)) : string).toPrecision(3))
  if (shortValue % 1 != 0) shortValue = shortValue.toFixed(2)
  return shortValue + " " + suffixs[suffixNum]
}

export const PERSON_KTDT = [1, 30, 17, 20, 26, 23, 11, 27, 32, 9, 15, 25, 13, 10]