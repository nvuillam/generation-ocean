import { DatabaseExceptionFilter, OtherExceptionFilter } from '../database/database-exception.filter';
import {
    UseFilters
} from '@nestjs/common';

@UseFilters(DatabaseExceptionFilter)
@UseFilters(OtherExceptionFilter)
export class ResourceRootController {

}