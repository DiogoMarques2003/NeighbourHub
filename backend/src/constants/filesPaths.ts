import { join } from 'path';

const BASE_PROFILE_PICTURES_PATH = join('files', 'profilePictures');
const PROFILE_PICTURES_PATH = join(
  __dirname,
  '..',
  '..',
  BASE_PROFILE_PICTURES_PATH
);

const BASE_COMMON_AREAS_PICTURES_PATH = join('files', 'commonAreasPictures');
const COMMON_AREAS_PATH = join(
  __dirname,
  '..',
  '..',
  BASE_COMMON_AREAS_PICTURES_PATH
);

const EMAILS_PATH = join(__dirname, '..', 'emails');

export {
  PROFILE_PICTURES_PATH,
  BASE_PROFILE_PICTURES_PATH,
  COMMON_AREAS_PATH,
  BASE_COMMON_AREAS_PICTURES_PATH,
  EMAILS_PATH,
};
