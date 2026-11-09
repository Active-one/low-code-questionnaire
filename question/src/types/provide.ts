import type { PicLinkObj } from './editProps';

export type UpdateStatusType = (
  configKey: string,
  newValue: string | number | boolean | object,
) => void;

export type GetPicLinkType = (picInfo: PicLinkObj) => void;

export type SelectCurrentComType = (index: number) => void;
