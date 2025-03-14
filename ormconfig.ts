import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CreateCategoryTable1739863121725 } from './src/migrations/1739863121725-CreateCategoryTable';
import { CreateProductTable1739863098488 } from './src/migrations/1739863098488-CreateProductTable';
import { CreateUsersTable1739863114487 } from './src/migrations/1739863114487-CreateUsersTable';
import { CreateReferenceTable1739863107282 } from './src/migrations/1739863107282-CreateReferenceTable';
import { FillUsersTable1739908247881 } from './src/migrations/1739908247881-FillUsersTable';
import { CreateGalleryTable1741623691711 } from './src/migrations/1741623691711-CreateGalleryTable';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'), 
  database: configService.get('DB_NAME'),
  entities: [],
  migrations: [
    CreateReferenceTable1739863107282,
    CreateCategoryTable1739863121725,
    CreateProductTable1739863098488,
    CreateUsersTable1739863114487,
    CreateGalleryTable1741623691711,
    FillUsersTable1739908247881
  ],
  synchronize: false
});