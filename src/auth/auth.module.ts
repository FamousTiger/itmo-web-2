import { Module, DynamicModule } from '@nestjs/common';
import { FirebaseApp } from './firebase-app';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [FirebaseApp],
    };
  }
}
