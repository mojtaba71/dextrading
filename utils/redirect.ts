export const createRedirectUrl = (location: any) => {
  return location.href.split(location.origin)[1];
};
