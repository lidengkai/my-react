declare module '*.less' {
  const styles: Record<string, string>;
  export = styles;
}

declare module '*.css';

declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare module '*.mp4';
declare module '*.webm';
declare module '*.ogg';
declare module '*.mp3';
declare module '*.wav';
declare module '*.flac';
declare module '*.aac';

declare namespace process {
  const env: {
    NODE_ENV: 'development' | 'production';
  };
}

declare const $APP_NAME: string;
declare const $APP_VERSION: string;
declare const $APP_MODE: 'development' | 'production';
declare const $APP_ENV: 'watch' | 'prod';

declare module '@project-demo' {
  import { RouteObject } from 'react-router-dom';
  import { MenuItem } from '@/type/menu';

  export const routers: RouteObject[];
  export const menu: MenuItem[];
}
