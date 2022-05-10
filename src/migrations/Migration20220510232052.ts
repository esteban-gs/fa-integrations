import { Migration } from '@mikro-orm/migrations';

export class Migration20220510232052 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "form" ("id" serial primary key, "form_key" varchar(255) not null, "active" boolean not null, "form_name" varchar(255) not null, "description" varchar(255) not null, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null);',
    );
    this.addSql(
      'alter table "form" add constraint "form_form_key_unique" unique ("form_key");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "form" cascade;');
  }
}
