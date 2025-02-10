export type TCategory = {
  id: string;
  label: string;
  type: string;
  icon: string;
  color: string;
  userId: string;
};

export enum CategoryType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  SAVING = 'SAVING',
}

export enum ECategorySortField {
  LABEL = 'label',
  TYPE = 'type',
}
