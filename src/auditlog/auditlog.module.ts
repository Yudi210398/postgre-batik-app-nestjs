import { Module } from '@nestjs/common';
import { AuditlogController } from './auditlog.controller';
import { AuditlogService } from './auditlog.service';

@Module({
  controllers: [AuditlogController],
  providers: [AuditlogService]
})
export class AuditlogModule {}
