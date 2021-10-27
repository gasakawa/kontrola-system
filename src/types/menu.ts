export type MenuIcons = {
  [key: string]: JSX.Element;
};

export type Module = {
  id: number;
  name: string;
  icon: string;
  position: number;
  routines: [{ icon: string; id: number; link: string; position: number; name: string }];
};
