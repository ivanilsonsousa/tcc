export type ModalPosition = 'top' | 'center' | 'bottom';

export const positionClasses: Record<ModalPosition, string> = {
  top : '-translate-y-64',
  center: '',
  bottom: 'translate-y-24',
};
