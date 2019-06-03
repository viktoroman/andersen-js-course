/**
 * Реализовать функцию createGenerator в этом файле, и экспортировать ее.
 *
 * При каждом вызове метода .next() происходит возврат следующего значения из массива
 * Когда все элементы будут возвращены,
 * следующие вызовы метода .next() должны возвращать строку 'Complete!'
 *
 * const generator = createGenerator([1, '6', 3, 2]);
 * generator.next(); -> 1
 * generator.next(); -> '6'
 * generator.next(); -> 3
 * generator.next(); -> 2
 * generator.next(); -> 'Complete!'
 * generator.next(); -> 'Complete!'
 */

export const createGenerator = (arr) => {
  const COMPLETE_MESSAGE = 'Complete!';
  let itr = arr[Symbol.iterator]();

  return {
    next() {
      const currValue = itr.next();
      return !currValue.done ? currValue.value : COMPLETE_MESSAGE;
    }
  };
};