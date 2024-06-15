export interface Sale {
  _id?:         string;
  finished?:    boolean;
  price?:       number;
  description?: string;
  product?:     string;
  date?:        string;
  cantToBuy?:   number;
  unities?:     number;
}
