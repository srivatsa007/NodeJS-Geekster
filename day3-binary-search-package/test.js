const binarySearch = require('./binarysearch');

// Test cases
test('Element found in array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const target = 5;
    const index = binarySearch(arr, target);
    expect(index).toBe(4); // jest syntax
});

test('Element not found in array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const target = 11;
    const index = binarySearch(arr, target);
    expect(index).toBe(-1);
});

