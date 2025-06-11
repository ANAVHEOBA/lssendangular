import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'dashboard/**',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return an empty array to skip API calls during prerendering
      return Promise.resolve([]);
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
