import dummyData from './dummyData.json';

const msMin = 100;
const msMax = 2000;

export default {
  getHierarchy: () => new Promise(resolve => {
    // Imitate response delay
    const ms = Math.random() * (msMax - msMin) + msMin;

    setTimeout(() => {
      resolve(dummyData)
    }, ms);
  }),
};