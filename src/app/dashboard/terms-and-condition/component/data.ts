import legalDocumentsData from "./data.json";
import { LegalDocumentsData } from "./type";

export async function getLegalDocumentsData(): Promise<LegalDocumentsData> {
  return legalDocumentsData as LegalDocumentsData;
}
