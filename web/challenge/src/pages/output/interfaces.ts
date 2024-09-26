export interface Clue {
  key: string;
  title: string;
  output: string;
}

export interface Evidence {
  key: string;
  title: string;
  clues: Clue[];
}

export interface Dimension {
  key: string;
  title: string;
  evidences: Evidence[];
}
