import { EntityRepository } from '@mikro-orm/postgresql';
import { Form } from './entities/form.entity';

export class FormRepository extends EntityRepository<Form> {}
