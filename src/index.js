import { foo, createCb } from './asynchronous-programming/task_001';
import { parseJSON, successCb, failureCb } from './asynchronous-programming/task_002';

console.log('task_001 =========================');
foo(-10, createCb('value -10'));
foo(0, createCb('value 0'));
foo(10, createCb('value 10'));
foo(20, createCb('value 20'));

console.log('task_002 =========================');
parseJSON('{"a": 1}', successCb, failureCb);
parseJSON('{a: b}', successCb, failureCb);
