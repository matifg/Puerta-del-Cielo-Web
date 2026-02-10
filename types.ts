
export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'General' | 'Jóvenes' | 'Niños' | 'Servicio';
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
}

export interface Devotional {
  date: string;
  title: string;
  verse: string;
  reference: string;
  content: string;
  author: string;
}

export interface RemaWord {
  year: number;
  word: string;
  verse: string;
  explanation: string;
}

export interface YoutubeInfo {
  channelId: string;
  latestVideoId: string;
  channelUrl: string;
  title: string;
}
