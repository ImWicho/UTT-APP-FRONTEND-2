export interface IToast{
  id?: number | undefined;
  title: string;
  description?: string;
  type: TOAST_TYPE;
  // isShowed: boolean;
  timeOut: number;
  useDefaultImage?: boolean;
  resource?:  string | null;
}

export enum TOAST_TYPE{
  DANGER = 'DANGER',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING'
}
