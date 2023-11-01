const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    const { from, to } = arr[mid];
    if (Number(from) <= target && target <= Number(to)) {
      return arr[mid];
    } else if (Number(to) < target && Number(from) < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return null;
};

module.exports = binarySearch;
