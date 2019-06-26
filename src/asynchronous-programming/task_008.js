const getUsers = url => fetch(url);

async function foo8(url) {
  try {
    const prom = await getUsers(url);
    const [user] = await prom.json();
    console.log(user);
  } catch (err) {
    console.log('Error! ', err);
  }
}

export default foo8;
