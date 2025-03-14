import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ReferencesModule } from './references/references.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { GalleryController } from './gallery/gallery.controller';
import { GalleryService } from './gallery/gallery.service';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductsModule,
    ReferencesModule,
    CategoriesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: false,
      autoLoadEntities: true
    }),
    MulterModule.register({
      dest: './public',
    }),
    GalleryModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
