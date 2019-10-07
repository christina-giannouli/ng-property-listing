import { UnitData } from './unit-data.interface';

export interface UnitDetails extends UnitData {
    availability: string[];
    amenities: string[];
}
