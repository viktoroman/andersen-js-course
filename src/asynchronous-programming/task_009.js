const asyncBar = async () => 'Some string';

async function foo9() {
  console.log(await asyncBar());
}

export default foo9;
