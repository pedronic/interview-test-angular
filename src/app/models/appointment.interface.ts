import Channel from "./channel.model";

export default interface IAppointment {
  channel: Channel;
  date: Date;
  image: File;
  type: string;
}
