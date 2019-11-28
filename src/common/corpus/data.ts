const data = [
  '안녕하세욧!',
  '하이루~',
  '방가워여~~~',
  '하잇~~',
  '안뇽',
  '안녕~~~!!',
  '안녕하세요^^',
  '어머나 ㅎㅎ',
  '방가방가~~',
]

export const getContent = () => {
  let i = Math.floor((Math.random() * data.length));
  return data[i];
}