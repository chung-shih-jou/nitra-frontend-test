import { locations } from './mock';

export const getLocations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(locations);
    }, 1000);
  });
};
