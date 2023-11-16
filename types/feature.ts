import { IconType } from './icon';

export interface FeatureInfo {
  title: string;
  href?: string;
  icon?: IconType;
  image?: string;
  description: string;
  protect?: boolean;
}
