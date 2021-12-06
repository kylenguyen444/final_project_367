import { memo } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

export const deepMemo = (factory, dependency) => {
    return memo(factory, (next, prev) => {
        if (isEmpty(dependency)) {
            return isEqual(next, prev);
        }
        return dependency(next, prev);
    });
};
