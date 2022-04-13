import { UseFilters } from '@nestjs/common';

import { NotFoundExceptionFilter } from '../not-found/not-found.exception';

@UseFilters(NotFoundExceptionFilter)
export class CommonController {}
