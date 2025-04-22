import CommonAreas from '@entities/CommonAreas';

export default interface ICommonAreasRepository {
  findById(id: string): Promise<CommonAreas | null>;
  create(commonArea: CommonAreas): Promise<CommonAreas>;
  countByType(condId: string, type?: number): Promise<number>;
  getCommonAreasWithPagination(
    pageSize: number,
    pageNumber: number,
    condId: string,
    type?: number
  ): Promise<CommonAreas[]>;
  update(commonArea: CommonAreas): Promise<CommonAreas>;
  delete(id: string): Promise<Boolean>;
  getImagesByCondominiumId(condominiumId: string): Promise<string[]>;
}
