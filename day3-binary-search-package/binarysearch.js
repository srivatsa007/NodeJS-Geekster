/**
 * Perform Binary Search on a sorted array.
 * @param {Array} arr - The sorted array to search.
 * @param {*} target - The target element to search for.
 * @returns {number} - The index of the target element in the array, or -1 if not found.
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Element not found
}

module.exports = binarySearch;
