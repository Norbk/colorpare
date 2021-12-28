export const round = (value: number, placement?: number): number => {
  if(!placement || placement == 0) return Math.round(value + Number.EPSILON);
  const decimals = Math.pow(10, placement);
  return Math.round((value + Number.EPSILON) * decimals) / decimals;
};

export const delta = (color1: Array<number>, color2: Array<number>): number => {
  if(color1.length != color2.length) return -1;
  return Math.sqrt(color1.reduce((acc, num, index) => {
    return acc += Math.pow(num - color2[index], 2);
  }, 0));
};
