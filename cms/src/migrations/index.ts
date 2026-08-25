import * as migration_20260817_231130_initial from './20260817_231130_initial';
import * as migration_20260819_221344_add_auth_hardening from './20260819_221344_add_auth_hardening';
import * as migration_20260819_225719_website_content from './20260819_225719_website_content';

export const migrations = [
  {
    up: migration_20260817_231130_initial.up,
    down: migration_20260817_231130_initial.down,
    name: '20260817_231130_initial',
  },
  {
    up: migration_20260819_221344_add_auth_hardening.up,
    down: migration_20260819_221344_add_auth_hardening.down,
    name: '20260819_221344_add_auth_hardening',
  },
  {
    up: migration_20260819_225719_website_content.up,
    down: migration_20260819_225719_website_content.down,
    name: '20260819_225719_website_content'
  },
];
