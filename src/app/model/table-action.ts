export interface TableAction {
  icon?: string;          // icon class (FontAwesome / Material Icon)
  iconColor?:string
  label: string;          // tooltip or text
  type: string;           // e.g. 'edit' | 'delete' | 'view'
  show?: boolean;         // conditionally show/hide
  style:string
}