import { EntityBase } from '@packages/nest-ddd';

type CategoryProperties = {
  name: string;
  index: number;
};

export class Category extends EntityBase {}
