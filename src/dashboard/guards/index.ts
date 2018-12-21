import { ActivitiesListGuard } from './activities-list.guard';
import { ProgramsGuard } from './programs.guard';
import { StaticConfigGuard } from './static-config.guard';

export * from './activities-list.guard';
export * from './programs.guard';
export * from './static-config.guard';

export const dashboardGuards = [
    ActivitiesListGuard,
    ProgramsGuard,
    StaticConfigGuard
];
