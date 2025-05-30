import { Routes } from '@angular/router';
import { LayoutComponent } from './features/layout/layout/layout.component';
import { HomeComponent } from './features/main/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'apps',
        loadChildren: () => import('@/src/app/features/main/blog/blog.routes'),
        data: { breadcrumb: 'Apps' },
    },
    ]
  }
];
