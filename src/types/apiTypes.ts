export interface Contact {
  category?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface Service {
  id: number | string; 
  name: string;
  category?: string;
}

export interface ServiceProvider {
  id: number | string;
  name: string;
  type?: string;
  location: string;
  city: string;
  state: string;
  services: Service[];
  about?: string;
  contact_info: Contact[]; 
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  imageUrl?: string;
}

export interface ApiResponse {
  providers: ServiceProvider[];
  total: number;
}
