import { organization } from './mock';

export const getTheOrganization = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(organization);
    }, 1000);
  });
};
