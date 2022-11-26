import { createMongoAbility, MongoAbility } from '@casl/ability';

export interface CASLAbility {
  action: string;
  subject: string;
  conditions?: any;
  fields?: any;
}

export const createCanInstance = (p: CASLAbility[]): MongoAbility => {
  return new (createMongoAbility as any)(p);
}