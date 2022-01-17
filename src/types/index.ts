export type ValueType = {
  title: string;
  value: string | number;
};

export type AttributesType = {
  items: string[];
  name: string;
};

export type PropertiesType = {
  name: string;
  imagePreview: string;
};

export type ItemType = {
  id: string;
  properties: PropertiesType;
};

export type ArtboardType = {
  name?: string;
  items?: ItemType[];
};
