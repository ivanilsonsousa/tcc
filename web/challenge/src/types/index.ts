export interface Clue {
  key: string;
  title?: string;
  detection?: string;
}

export interface Evidence {
  key: string;
  title?: string;
  clues: Clue[];
}

export interface Dimension {
  key: string;
  title?: string;
  evidences: Evidence[];
}

export interface IDimensionsList {
  dimensions: Dimension[];
}