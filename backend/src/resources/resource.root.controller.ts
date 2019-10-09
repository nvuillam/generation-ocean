import { DatabaseExceptionFilter } from '../database/database-exception.filter';
import { OtherExceptionFilter } from './resource-exception.filter';
import { UseFilters } from '@nestjs/common';

@UseFilters(DatabaseExceptionFilter)
@UseFilters(OtherExceptionFilter)
export class ResourceRootController {}
