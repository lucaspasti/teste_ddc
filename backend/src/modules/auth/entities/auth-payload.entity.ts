import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthPayload {
  @Field()
  id: number
  @Field()
  name: string
  @Field()
  accessToken: string
}
