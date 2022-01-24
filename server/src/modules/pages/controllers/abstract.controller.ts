import { UseFilters } from '@nestjs/common';

import { NotFoundExceptionFilter } from '../exceptions/notFoundException';

@UseFilters(NotFoundExceptionFilter)
export class AbstractController {}
