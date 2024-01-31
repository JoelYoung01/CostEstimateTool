import type { DrawnArea } from ".";

export interface DataPackage {
  name?: string;
  email?: string;
  phone?: string;
  desiredCompleteDate?: string;
  polygons?: DrawnArea[];
}
