export default class Schedule {

  id: number;
  created_at: string;
  status: string;
  now: boolean;
  date: string;
  caption: string;
  ig_code?: any;
  is_history: boolean;
  is_album: boolean;
  is_igtv: boolean;
  is_reels: boolean;
  ig_image_url?: any;
  type: string;
  media_type: string;
  image: Image;
  channel: IChannel;
  socials: any[];
  constructor(object?: Partial<Schedule>){
    this.id = object?.id;
    this.created_at = object?.created_at;
    this.status = object?.status;
    this.now = object?.now;
    this.date = object?.date;
    this.caption = object?.caption;
    this.ig_code = object?.ig_code;
    this.is_history = object?.is_history;
    this.is_album = object?.is_album;
    this.is_igtv = object?.is_igtv;
    this.is_reels = object?.is_reels;
    this.ig_image_url = object?.ig_image_url;
    this.type = object?.type;
    this.media_type = object?.media_type;
    this.image = object?.image;
    this.channel = object?.channel;
    this.socials = object?.socials;
  }
}

interface IChannel {
  id: number;
  username: string;
  profile_pic: string;
}

interface Image {
  id: number;
  filename: string;
  is_album: boolean;
  url: string;
  type?: any;
}
