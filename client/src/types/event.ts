export type EventType = {
  _id: string;
  name: string;
  slug: {
    current: string;
    _type: string;
  };
  date: string;
  image: {
    asset: {
      _ref: string;
    };
  };
};
