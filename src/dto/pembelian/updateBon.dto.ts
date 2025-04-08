import { PartialType } from '@nestjs/mapped-types';
import { PembelianDTO } from './pembelian.dto';

export class UpdateBon extends PartialType(PembelianDTO) {}
