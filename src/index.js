import { foo, createCb } from './asynchronous-programming/task_001';
import { parseJSON, successCb, failureCb } from './asynchronous-programming/task_002';
import delay from './asynchronous-programming/task_003';
import getData from './asynchronous-programming/task_004';
import {
  urlsTask005,
  getDataAllParallel,
  getDataAllSequentail,
} from './asynchronous-programming/task_005';
import checkResolvedValue from './asynchronous-programming/task_006';

console.log('task_001 =========================');
foo(-10, createCb('value -10'));
foo(0, createCb('value 0'));
foo(10, createCb('value 10'));
foo(20, createCb('value 20'));

console.log('task_002 =========================');
parseJSON('{"a": 1}', successCb, failureCb);
parseJSON('{a: b}', successCb, failureCb);

console.log('task_003 =========================');
delay(1000).then(value => console.log(`Task 3. Done with ${value}`));

console.log('task_004 =========================');
getData();

console.log('task_005 =========================');
getDataAllParallel(urlsTask005);
getDataAllSequentail(urlsTask005);

console.log('task_006 =========================');
checkResolvedValue(500);
// checkResolvedValue(200);
