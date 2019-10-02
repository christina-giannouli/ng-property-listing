import { UnitData } from './unit-data.interface';
import { UnitMeta } from './unit-meta.interface';

export interface Unit {
    data: UnitData[];
    meta: UnitMeta;
}
