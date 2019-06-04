/**
 * Реализовать функцию membersOnActiveMeetups в этом файле, и экспортировать ее.
 *
 * Функция принимает массив meetups,
 * и возвращает суммарное количество человек, находящихся на активных митапах
 *
 * Пример вызова с нижним набором данных
 * membersOnActiveMeetups(meetups); // 1500
 */

// Раскомментировать нижнее, при начале реализации

// const meetups = [
//   { name: 'JavaScript', isActive: true, members: 100 },
//   { name: 'Angular', isActive: true, members: 900 },
//   { name: 'Node', isActive: false, members: 600 },
//   { name: 'React', isActive: true, members: 500 },
// ];

export const membersOnActiveMeetups = meetups => {
  return meetups.reduce((accValue, { isActive, members }) => {
    return isActive ? accValue + members : accValue;
  }, 0);
};
