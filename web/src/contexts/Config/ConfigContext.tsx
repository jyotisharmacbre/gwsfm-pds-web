import { createContext } from 'react';
import IConfig from '../../models/IConfig';

const ConfigContext = createContext<IConfig>({} as IConfig);

export default ConfigContext;

