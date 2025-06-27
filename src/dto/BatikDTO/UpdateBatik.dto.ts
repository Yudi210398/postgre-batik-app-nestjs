import { PartialType } from '@nestjs/mapped-types';
import { BatikAddDTO } from './BatikAdd.dto';

export class UpdateDto extends PartialType(BatikAddDTO) {}
