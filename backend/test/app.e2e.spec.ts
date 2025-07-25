import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { it } from '@jest/globals'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
  })

  it('/analytics (GET)', () => {
    return request(app.getHttpServer())
      .get('/analytics')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('totalPosts')
        expect(res.body).toHaveProperty('totalUsers')
        expect(res.body).toHaveProperty('totalCategories')
      })
  })

  afterAll(async () => {
    await app.close()
  })

})
