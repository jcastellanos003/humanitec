import { ProgramsEffects } from './programs.effect';
import { StaticConfigEffects } from './static-config.effect';

export * from './programs.effect';
export * from './static-config.effect';

export const effects = [ProgramsEffects, StaticConfigEffects];
