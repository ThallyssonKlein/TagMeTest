import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [OrderModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
