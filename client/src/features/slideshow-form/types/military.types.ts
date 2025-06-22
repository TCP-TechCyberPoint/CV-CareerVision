export type MilitaryDegreeGroup = 'enlisted' | 'senior_ncos' | 'officers';

export type EnlistedDegree = 
  | 'private'           // טוראי
  | 'corporal'          // רב-טוראי
  | 'sergeant'          // סמל
  | 'staff_sergeant';   // סמל ראשון

export type SeniorNCODegree = 
  | 'sergeant_first_class' // רב-סמל (רס"ל)
  | 'master_sergeant'   // רב-סמל ראשון (רס"ר)
  | 'sergeant_major'    // רב-סמל מתקדם (רס"מ)
  | 'senior_sergeant_major' // רב-סמל בכיר (רס"ב)
  | 'command_chief_warrant_officer'; // רב-נגד (רנ"ג)

export type OfficerDegree = 
  | 'second_lieutenant' // סגן משנה (סג"מ)
  | 'lieutenant'        // סגן (סגן)
  | 'captain'           // סרן (סרן)
  | 'major';            // רב-סרן (רס"ן)

export type MilitaryDegree = EnlistedDegree | SeniorNCODegree | OfficerDegree;

export interface MilitaryServiceInfo {
  militaryServiceStatus:
    | 'full_military'
    | 'partial_military'
    | 'national_service'
    | 'civil_service'
    | 'exempted'
    | 'not_served'
    | 'other';
  serviceDuration?: string;
  serviceDetails?: string;
  otherServiceType?: string;
  degreeGroup?: MilitaryDegreeGroup;
  degree?: MilitaryDegree;
}

export type MilitaryService = MilitaryServiceInfo; 