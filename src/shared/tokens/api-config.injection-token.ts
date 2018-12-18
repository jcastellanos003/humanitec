import { InjectionToken } from '@angular/core';

import { ApiConfig } from '@humanitec/core';

export const ApiConfigInjectionToken = new InjectionToken<ApiConfig>(
    'ApiConfigInjectionToken'
);
