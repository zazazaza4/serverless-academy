const { findValueOfKey } = require('../utils/dataProcessing');

describe('findValueOfKey function', () => {
  test('Finds key in a simple object', () => {
    const testObject = {
      name: 'John',
      age: 30,
      isDone: true,
    };

    const foundValue = findValueOfKey(testObject, 'isDone');
    expect(foundValue).toBe(true);
  });

  test('Finds key in a nested object', () => {
    const testObject = {
      name: 'John',
      details: {
        age: 30,
        address: {
          city: 'Kharkiv',
          country: 'Ukraine',
        },
        res: {
          isDone: false,
        },
      },
    };

    const foundValue = findValueOfKey(testObject, 'isDone');
    const foundValue2 = findValueOfKey(testObject, 'country');

    expect(foundValue).toBe(false);
    expect(foundValue2).toBe('Ukraine');
  });

  test('Key not found', () => {
    const testObject = {
      name: 'John',
      age: 30,
      address: {
        city: 'Kharkiv',
      },
    };

    const result = findValueOfKey(testObject, 'isDone');

    expect(result).toBe(null);
  });

  test('Non-object input', () => {
    const testString = 'This is not an object';

    const result = findValueOfKey(testString, 'isDone');
    expect(result).toBe(null);
  });

  test('Null input', () => {
    const result = findValueOfKey(null, 'key');
    expect(result).toBe(null);
  });

  test('Empty object input', () => {
    const result = findValueOfKey({}, 'isDone');

    expect(result).toBe(null);
  });
});
