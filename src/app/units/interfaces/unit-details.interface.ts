import { UnitData } from './unit-data.interface';

export interface UnitDetails extends UnitData {
    availability: number[];
    amenities: string[];
}
