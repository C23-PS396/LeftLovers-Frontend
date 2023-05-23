export interface MerchantInformationInput {
  name: string;
  province: Province;
  regency: Regency;
  district: District;
  village: Village;
  fullLocation: string;
}

export interface Province {
  id: string;
  name: string;
}

export interface Regency {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
}

export interface Village {
  id: string;
  name: string;
}
