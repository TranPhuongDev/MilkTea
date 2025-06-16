import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './auths/auths.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auths/passport/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { OptionsModule } from './options/options.module';
import { OptionvaluesModule } from './optionvalues/optionvalues.module';
import { TablesModule } from './tables/tables.module';
import { DineinordersModule } from './dineinorders/dineinorders.module';
import { DineinorderitemsModule } from './dineinorderitems/dineinorderitems.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Table } from './tables/entities/table.entity';
import { OptionValue } from './optionvalues/entities/optionvalue.entity';
import { DineInOrderItem } from './dineinorderitems/entities/dineinorderitem.entity';
import { DineInOrder } from './dineinorders/entities/dineinorder.entity';
import { Option } from './options/entities/option.entity';
import { Review } from './reviews/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Hoặc địa chỉ IP của máy chủ MySQL
      port: 3306, // Hoặc cổng MySQL của bạn
      username: 'root',
      password: '123456',
      database: 'milktea',
      entities: [
        User,
        Category,
        Product,
        Table,
        DineInOrderItem,
        DineInOrder,
        OptionValue,
        Option,
        Review,
      ], // Đường dẫn đến các entity của bạn
      synchronize: true, // Chỉ sử dụng trong môi trường phát triển
      autoLoadEntities: true,
    }),

    TypeOrmModule.forFeature([User, Category, Product]),

    UsersModule,
    AuthsModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // ignoreTLS: true,
        // secure: false,
        auth: {
          // user: process.env.MAILDEV_INCOMING_USER,
          // pass: process.env.MAILDEV_INCOMING_PASS,
          user: 'vanphuongvip29@gmail.com',
          pass: 'olisssgpkmbupglq',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      // preview: true,
      template: {
        dir: process.cwd() + '/src/mail/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    CategoriesModule,
    ProductsModule,

    OptionsModule,

    OptionvaluesModule,

    TablesModule,

    DineinordersModule,

    DineinorderitemsModule,

    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
