export type RecordType = "LDAP" | "Локальная";

export interface LabelItem {
  text: string;
}

export interface Account {
  id: string;
  label: string;
  labelItems: LabelItem[];
  recordType: RecordType;
  login: string;
  password: string | null;
}

export interface AccountFormState {
  label: string;
  recordType: RecordType;
  login: string;
  password: string;
}
