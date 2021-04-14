class Track {
  status: string;

  local: string | null;

  origin: string | null;

  destiny: string | null;

  date: string | null;

  hour: string | null;

  constructor(
    status: string,
    local: string | null,
    origin: string | null,
    destiny: string | null,
    date: string | null,
    hour: string | null,
  ) {
    this.status = status;
    this.local = local || null;
    this.origin = origin || null;
    this.destiny = destiny || null;
    this.date = date || null;
    this.hour = hour || null;
  }
}

export default Track;
