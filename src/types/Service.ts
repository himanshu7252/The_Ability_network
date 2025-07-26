export interface Contact {
  category: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface Address {
  address_label: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: number;
  organization_name: string;
  contacts: Contact[];
}

export interface Service {
  id: string;
  service_name: string;
  service_description: string;
  disabilities: string[];
  organization_names: string[];
  cities: string[];
  states: string[];
  addresses: Address[];
}
