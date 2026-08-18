import * as migration_20260817_231130_initial from './20260817_231130_initial';

export const migrations = [
  {
    up: migration_20260817_231130_initial.up,
    down: migration_20260817_231130_initial.down,
    name: '20260817_231130_initial'
  },
];
