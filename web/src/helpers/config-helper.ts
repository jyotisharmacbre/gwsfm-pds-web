const appConfig = () => {
  const config: any = (window as any).Config;
  if (config && config.REACT_APP_CLIENT_ID === '#{PDSClientId}#') {
    return {
      ...process.env
    };
  }
  return {
    ...config
  };
};

export default appConfig;
