import { ColumnDef } from '@tanstack/react-table';

// Extend ColumnDef with a custom property 'lock'
export type CustomColumnDef<T> = ColumnDef<T> & {
    lock?: boolean;
    name?: string
};
