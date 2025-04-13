import IcondominiumGetByUserDTO from './ICondominiumGetByUserDTO';

export default class CondominiumGetByUserVerifications {
  execute(data: IcondominiumGetByUserDTO) {
    const { isAdmin, pageNumber, pageSize } = data;

    if (typeof isAdmin !== 'boolean') data.isAdmin = false;
    if (!pageSize || typeof pageSize !== 'number') data.pageSize = 5;

    if (!pageNumber || typeof pageNumber !== 'number') data.pageNumber = 1;
  }
}
