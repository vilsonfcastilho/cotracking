class Track {
  status: string | null;

  origin: string | null;

  destiny: string | null;

  date: string | null;

  hour: string | null;

  constructor(
    status: string,
    origin: string | null,
    destiny: string | null,
    date: string | null,
    hour: string | null,
  ) {
    this.status = status || null;
    this.origin = origin || null;
    this.destiny = destiny || null;
    this.date = date || null;
    this.hour = hour || null;
  }
}

export default Track;
