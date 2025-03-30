import IcondominiumGetByUserDTO from './ICondominiumGetByUserDTO';

export default class CondominiumGetByUserVerifications {
  execute(data: IcondominiumGetByUserDTO) {
    const { isAdmin } = data;

    if (typeof isAdmin !== 'boolean') data.isAdmin = false;
  }
}
