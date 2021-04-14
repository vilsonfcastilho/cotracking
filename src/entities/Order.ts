import Track from './Track';

class Order {
  order: string;

  tracks: Track[];

  constructor(order: string, tracks: Track[]) {
    this.order = order;
    this.tracks = tracks;
  }
}

export default Order;
