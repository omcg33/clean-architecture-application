import { UseFilters } from '@nestjs/common';

import { NotFoundExceptionFilter } from './not-found.exception';

@UseFilters(NotFoundExceptionFilter)
export class CommonController {}
