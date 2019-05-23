const urgencies: { type: string, value: number }[] = [
  {
    type: 'urgent',
    value: 4
  },
  {
    type: 'high',
    value: 3
  },
  {
    type: 'medium',
    value: 2
  },
  {
    type: 'low',
    value: 1
  }];

const categories: { type: string, value: number }[] = [
  {
    type: 'other',
    value: 4
  },
  {
    type: 'Network',
    value: 3
  },
  {
    type: 'Software',
    value: 2
  },
  {
    type: 'Hardware',
    value: 1
  }];


export {
  urgencies,
  categories
};
