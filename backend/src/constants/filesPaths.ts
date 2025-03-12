import { join } from 'path';

const BASE_PROFILE_PICTURES_PATH = join('files', 'profilePictures');
const PROFILE_PICTURES_PATH = join(
  __dirname,
  '..',
  '..',
  BASE_PROFILE_PICTURES_PATH
);

export { PROFILE_PICTURES_PATH, BASE_PROFILE_PICTURES_PATH };
