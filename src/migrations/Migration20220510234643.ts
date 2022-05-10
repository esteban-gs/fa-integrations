import { Migration } from '@mikro-orm/migrations';

export class Migration20220510234643 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "form" ("id" serial primary key, "key" varchar(255) not null, "active" boolean not null, "name" varchar(255) not null, "url" varchar(255) not null, "description" varchar(255) not null, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "form" add constraint "form_key_unique" unique ("key");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "form" cascade;');
  }

}
