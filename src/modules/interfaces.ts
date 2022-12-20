export interface Book {
  audience: String;
  author: String;
  color: String;
  id: Number;
  pages: Number;
  plot: String;
  publisher: String;
  title: String;
  year: Number;
}

export interface Cart extends Book {
  quantity: number;
}
