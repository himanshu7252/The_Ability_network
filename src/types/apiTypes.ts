export interface Service {
  id: number;
  name: string;
  category: string;
}

export interface ServiceProvider {
  id: number;
  name: string;
  type: string;
  location: string;
  city: string;
  state: string;
  services: Service[];
  about: string;
  contact_info: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  imageUrl: string;
}

export interface ApiResponse {
  providers: ServiceProvider[];
  total: number;
}