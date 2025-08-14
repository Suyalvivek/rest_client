// backend/src/shared/types/RequestHistory.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

// 👇 Add this DTO type
export type CreateHistoryDto = {
  method: string;
  url: string;
  status: number;
  body?: object;
  headers?: object;
  response?: string;
};

@Entity()
export class RequestHistory {
  // ... your existing entity properties
  @PrimaryKey()
  id!: number;

  @Property()
  method!: string;

  @Property()
  url!: string;

  @Property({ type: 'json', nullable: true })
  body?: object;

  @Property({ type: 'json', nullable: true })
  headers?: object;
  
  @Property()
  status!: number;

  @Property({ type: 'text', nullable: true })
  response?: string;

  @Property()
  createdAt: Date = new Date();
}