import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { FormRepository } from '../form.repository';

@Entity()
export class Form {
  [EntityRepositoryType]?: FormRepository;
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  key: string;

  @Property()
  active: boolean;

  @Property()
  name: string;

  @Property()
  url: string;

  @Property()
  description: string;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  createdAt = new Date();

  public constructor(init?: Partial<Form>) {
    Object.assign(this, init);
  }
}
