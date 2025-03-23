import CommonAreas from '@entities/CommonAreas';

export default interface ICommonAreasRepository {
  findById(id: string): Promise<CommonAreas | null>;
  create(commonArea: CommonAreas): Promise<CommonAreas>;
  update(commonArea: CommonAreas): Promise<CommonAreas>;
}
