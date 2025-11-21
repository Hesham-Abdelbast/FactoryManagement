export interface HeaderButton {
    text: string;
  icon?: string;
  type?: 'primary' | 'danger' | 'warning' | 'success' | 'info';
  eventName: string;
}
