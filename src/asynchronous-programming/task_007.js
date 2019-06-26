const getPromise1 = () => Promise.resolve(2);
const getPromise2 = () => Promise.resolve(3);
const getPromise3 = () => Promise.resolve(7);

async function foo7() {
  const v1 = await getPromise1();
  const v2 = await getPromise2();
  const v3 = await getPromise3();

  console.log(v1 * (v2 + v3));
}

export default foo7;
