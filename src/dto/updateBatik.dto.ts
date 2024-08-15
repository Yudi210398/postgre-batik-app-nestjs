import { PartialType } from '@nestjs/mapped-types';
import { CreateBatikDto } from './createBatik.dto';

export class UpdateBatiks extends PartialType(CreateBatikDto) {}
