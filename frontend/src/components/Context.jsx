import { createContext } from 'react';

const Context = createContext();
export const CProvider = Context.Provider;
export const CConsumer = Context.Consumer;

export default Context;
