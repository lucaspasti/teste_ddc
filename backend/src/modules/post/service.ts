import { Injectable } from '@nestjs/common'
import { ZodValidationError } from 'src/@shared/graphql/errors'
import { ExecutionDTOType, MethodType } from 'src/@shared/types/auth'
import { checkPermission } from 'src/@shared/utils'
import { PrismaService } from 'src/infra/database/prisma.service'
import { CreateDTO, DeleteDTO, EntityResponse, GetDTO, UpdateDTO } from './entities/entity'
import { moduleMetadata } from './moduleMetadata'

@Injectable()
export class Service {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: ExecutionDTOType<any, any>): Promise<EntityResponse> {
    let DTO = data
    for (const rule of Object.values(this[data.method].rules)) {
      DTO = await (rule as any)(DTO)
      if (DTO.error) {
        return DTO.error
      }
    }

    const result = await this[data.method].execution(DTO)

    return result
  }

  create: MethodType<ExecutionDTOType<CreateDTO, 'create'>, EntityResponse> = {
    rules: {
      validateDTOData: async (data) => {
        const validatedData = ZodValidationError.validate(CreateDTO.zodSchema(), data.datap)
        console.log("Validated data:", validatedData);
        if ('errors' in validatedData) {
          data.error = { error: { errors: validatedData.errors } }
        }
        data.datap = validatedData as any
        return data
      },
      checkAuthorExists: async (data) => {
        if (data.datap.author?.connect?.id) {
          console.log("Checking author existence for ID:", data.datap.author.connect.id);
          const authorExists = await this.prisma.user.findUnique({
            where: { id: data.datap.author.connect.id },
          })
          if (!authorExists) {
            data.error = { error: { notFound: 'Autor não encontrado' } }
          }
        }
        return data
      },
    },
    execution: async (data: ExecutionDTOType<CreateDTO, 'create'>) => {
      const result = await this.prisma[moduleMetadata.tb].create({
        data: data.datap as any,
        include: {
          author: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      })

      return {
        data: {
          count: 1,
          items: [result],
        },
      }
    },
  }

  get: MethodType<ExecutionDTOType<GetDTO, 'get'>, EntityResponse> = {
    rules: {
      validateDTOData: async (data) => {
        const validatedData = ZodValidationError.validate(GetDTO.zodSchema(), data.datap)
        if ('errors' in validatedData) {
          data.error = { error: { errors: validatedData.errors } }
        }
        data.datap = validatedData as any
        return data
      },
    },
    execution: async (data: ExecutionDTOType<GetDTO, 'get'>) => {
      const canViewAll = (await checkPermission({ prisma: this.prisma, token: data.tokenData, data: ['api-ler-post'] }))
        .permitted

      const where: any = {}
      if (!canViewAll) {
        where.published = true
      }

      const take = data.datap.take || 10
      const skip = data.datap.skip || 0

      const [items, count] = await Promise.all([
        this.prisma[moduleMetadata.tb].findMany({
          where,
          take,
          skip,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: true,
            categories: {
              include: {
                category: true,
              },
            },
          },
        }),
        this.prisma[moduleMetadata.tb].count({ where }),
      ])

      return {
        data: {
          count,
          items,
        },
      }
    },
  }

  update: MethodType<ExecutionDTOType<UpdateDTO, 'update'>, EntityResponse> = {
    rules: {
      validateDTOData: async (data) => {
        const validatedData = ZodValidationError.validate(UpdateDTO.zodSchema(), data.datap)
        if ('errors' in validatedData) {
          data.error = { error: { errors: validatedData.errors } }
        }
        data.datap = validatedData as any
        return data
      },
      checkExists: async (data) => {
        const result = await this.prisma[moduleMetadata.tb].findUnique({
          where: { id: data.datap.id },
        })
        if (!result) {
          data.error = { error: { notFound: 'Post não encontrado' } }
        }
        return data
      },
    },
    execution: async (data: ExecutionDTOType<UpdateDTO, 'update'>) => {
      const { id, ...updateData } = data.datap
      const result = await this.prisma[moduleMetadata.tb].update({
        where: { id },
        data: updateData as any,
        include: {
          author: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      })

      return {
        data: {
          count: 1,
          items: [result],
        },
      }
    },
  }

  delete: MethodType<ExecutionDTOType<DeleteDTO, 'delete'>, EntityResponse> = {
    rules: {
      validateDTOData: async (data) => {
        console.log("Entering delete rules.");
        const validatedData = ZodValidationError.validate(DeleteDTO.zodSchema(), data.datap)
        if ('errors' in validatedData) {
          data.error = { error: { errors: validatedData.errors } }
        }
        data.datap = validatedData as any
        console.log(data.datap);
        return data
      },
      checkExists: async (data) => {
        const result = await this.prisma[moduleMetadata.tb].findUnique({
          where: { id: data.datap.id },
        })
        if (!result) {
          data.error = { error: { notFound: 'Post não encontrado' } }
        }
        return data
      },
    },
    execution: async (data: ExecutionDTOType<DeleteDTO, 'delete'>) => {
      // Delete related PostCategory entries first
      await this.prisma.postCategory.deleteMany({
        where: { postId: data.datap.id },
      })

      const result = await this.prisma[moduleMetadata.tb].delete({
        where: { id: data.datap.id },
      })

      return {
        data: {
          count: 1,
          items: [result],
        },
      }
    },
  }
}
