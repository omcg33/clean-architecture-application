import { Routes } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { PagesModule } from './pages/pages.module';

export const routes: Routes = [
    {
        path: '/',
        module: PagesModule
    },
    {
        path: '/api',
        module: ApiModule,
    },
];