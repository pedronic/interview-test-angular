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
