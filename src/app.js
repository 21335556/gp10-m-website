const Name = require('./controllers/Name')  //common语法/
const aaTpl = require('./views/aa.art')
// import { name } from './controllers/name'    // es6 模块化
// console.log(name);

async function getName() {
  console.log(Name.name);
  const name = await Name.getName()
  // await Name.getName()
  console.log(name);
  console.log(name);
}

getName()

const newStr = template.render(aaTpl,{title: 'asdfgfdwerrew'})

console.log(newStr);