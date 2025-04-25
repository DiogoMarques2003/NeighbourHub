import Services from '@entities/Services';
import { Prisma, PrismaClient } from '@prismaClient/client';
import IServicesRepository from '@repositories/IServicesRepository';
import ServicesWithUserData from 'src/@types/ServicesWithUserData';
import ServicesWithAvgReview from '../../@types/ServicesWithAvgReview';
import sql = Prisma.sql;

export default class PrismaServicesRepository implements IServicesRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Services | null> {
    return this.prisma.services.findUnique({ where: { id } });
  }

  findByCond(condId: string): Promise<Services[]> {
    return this.prisma.services.findMany({ where: { condominiumId: condId } });
  }

  findByIdWithUserData(id: string): Promise<ServicesWithUserData | null> {
    return this.prisma.services.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        cost: true,
        condominiumId: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            foto: true,
          },
        },
      },
    });
  }

  async countByCondIdFiltered(condId: string, minReview: number, maxReview: number, ownerId: string): Promise<number> {
    let whereClause = `WHERE s."condominiumId" = $1`;
    const params: any[] = [condId];
    let paramIndex = 2;

    if (ownerId) {
      whereClause += ` AND s."ownerId" = $${paramIndex}`;
      params.push(ownerId);
      paramIndex++;
    }

    let havingClause = '';
    if (minReview) {
      havingClause += `${havingClause ? ' AND' : 'HAVING'} COALESCE(AVG(sr.rating), 0) >= $${paramIndex}`;
      params.push(minReview);
      paramIndex++;
    }
    if (maxReview) {
      havingClause += `${havingClause ? ' AND' : 'HAVING'} COALESCE(AVG(sr.rating), 0) <= $${paramIndex}`;
      params.push(maxReview);
      paramIndex++;
    }

    const query = `
        SELECT COUNT(*)
        FROM (SELECT s.id
              FROM "Services" s
                       LEFT JOIN "ServiceRequests" srq ON srq."serviceId" = s.id
                       LEFT JOIN "ServiceReviews" sr ON sr."serviceRequestId" = srq.id
                  ${whereClause}
              GROUP BY s.id ${havingClause}) AS filtered_services
    `;

    const result = await this.prisma.$queryRawUnsafe<{ count: bigint }[]>(query, ...params);
    return Number(result[0]?.count || 0);
  }

  getWithPagination(pageSize: number, pageNumber: number, condId: string, minReview: number, maxReview: number, ownerId: string): Promise<ServicesWithAvgReview[]> {
    const offset = (pageNumber - 1) * pageSize;

    // WHERE base
    let whereClause = sql`s."condominiumId" = ${condId}`;
    if (ownerId) {
      whereClause = sql`${whereClause} AND s."ownerId" = ${ownerId}`;
    }

    // HAVING base
    let havingClause = sql``;
    if (minReview) {
      havingClause = sql`COALESCE(AVG(sr.rating), 0) >= ${minReview}`;
    }
    if (maxReview) {
      havingClause = havingClause.text.length
        ? sql`${havingClause} AND COALESCE(AVG(sr.rating), 0) <= ${maxReview}`
        : sql`COALESCE(AVG(sr.rating), 0) <= ${maxReview}`;
    }

    const query = sql`
        SELECT s.id,
               s.name,
               s.description,
               s.cost,
               s."condominiumId",
               s."createdAt",
               COALESCE(AVG(sr.rating), 0) ::FLOAT AS "avgReview"
        FROM "Services" s
                 LEFT JOIN "ServiceRequests" srq ON srq."serviceId" = s.id
                 LEFT JOIN "ServiceReviews" sr ON sr."serviceRequestId" = srq.id
        WHERE ${whereClause}
        GROUP BY s.id
            ${havingClause.text.length ? sql`HAVING
            ${havingClause}` : sql``}
        ORDER BY s."createdAt" DESC
            LIMIT ${pageSize}
        OFFSET ${offset}
    `;

    return this.prisma.$queryRaw<ServicesWithAvgReview[]>(query);
  }

  create(service: Services): Promise<Services> {
    return this.prisma.services.create({ data: service });
  }

  update(service: Services): Promise<Services> {
    return this.prisma.services.update({ where: { id: service.id }, data: service });
  }

  async delete(id: string): Promise<Boolean> {
    return !!(await this.prisma.services.delete({ where: { id } }));
  }
}
