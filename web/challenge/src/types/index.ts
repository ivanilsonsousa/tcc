export interface Clue {
  title: string;
  detection: string;
}

export interface Evidence {
  title: string;
  clues: { [key: string]: Clue };
}

export interface Dimension {
  key: number;
  title: string;
  evidences: { [key: string]: Evidence };
}

export interface TransformResult {
  dimensions: { [key: string]: Dimension };
}

export interface CheckboxFormData {
  nestedCheckboxes: { [key: string]: boolean };
}