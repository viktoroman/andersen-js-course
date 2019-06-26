import { foo, createCb } from './asynchronous-programming/task_001';
import { parseJSON, successCb, failureCb } from './asynchronous-programming/task_002';
import delay from './asynchronous-programming/task_003';
import getData from './asynchronous-programming/task_004';

console.log('task_001 =========================');
foo(-10, createCb('value -10'));
foo(0, createCb('value 0'));
foo(10, createCb('value 10'));
foo(20, createCb('value 20'));

console.log('task_002 =========================');
parseJSON('{"a": 1}', successCb, failureCb);
parseJSON('{a: b}', successCb, failureCb);

console.log('task_003 =========================');
delay(2000).then(value => console.log(`Done with ${value}`));

console.log('task_004 =========================');
getData();
