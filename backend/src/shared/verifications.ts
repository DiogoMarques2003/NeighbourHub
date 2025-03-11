import { validate as uuidValidate, version as uuidVersionValidate } from 'uuid';

function isValidUUID(uuid: string): boolean {
  return uuidValidate(uuid) && uuidVersionValidate(uuid) === 4;
}

export { isValidUUID };
