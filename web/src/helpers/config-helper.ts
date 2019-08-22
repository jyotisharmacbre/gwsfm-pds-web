const appConfig = () => {
    const config: any = (window as any).Config;
    if(config && config.REACT_APP_AUTH_INSTANCE==="#{AUTH_INSTANCE}#"){
      return {
        ...process.env
      }
    }
    return {
      ...config
    }
  };
  
  export default appConfig;