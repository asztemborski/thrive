import { ExceptionBase } from '@packages/nest-exceptions';
import { exceptionCodes } from './exception.codes';

export class ThreadMaximumCountExceedException extends ExceptionBase {
  constructor(count: number) {
    super(`Threads count must not exceed ${count}`, exceptionCodes.threadMaximumCount);
  }
}

export class CategoryMaximumCountExceedException extends ExceptionBase {
  constructor(count: number) {
    super(`Thread categories count must not exceed ${count}`, exceptionCodes.categoryMaximumCount);
  }
}

export class CategoryDoesNotExistException extends ExceptionBase {
  constructor(id: string) {
    super(`Category with id ${id} does not exist`, exceptionCodes.categoryDoesNotExist);
  }
}

export class SubCategoryCannotHaveSubCategoriesException extends ExceptionBase {
  constructor() {
    super('Sub category cannot have sub categories', exceptionCodes.subCategoryLimit);
  }
}

export class ThreadCannotBeAssignedToCurrentCategoryException extends ExceptionBase {
  constructor() {
    super('Thread cannot be assigned to current category exception', exceptionCodes.threadCategory);
  }
}
