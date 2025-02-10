export type TUser = {
  id: string;
  lastname: string;
  firstname: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  password: string;
  defaultCurrency: string;
};

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Currency {
  USD = 'USD', // Dollar américain
  EUR = 'EUR', // Euro
  GBP = 'GBP', // Livre sterling
  JPY = 'JPY', // Yen japonais
  AUD = 'AUD', // Dollar australien
  CAD = 'CAD', // Dollar canadien
  CHF = 'CHF', // Franc suisse
  CNY = 'CNY', // Yuan chinois
  SEK = 'SEK', // Couronne suédoise
  NZD = 'NZD', // Dollar néo-zélandais
  MXN = 'MXN', // Peso mexicain
  SGD = 'SGD', // Dollar de Singapour
  HKD = 'HKD', // Dollar de Hong Kong
  NOK = 'NOK', // Couronne norvégienne
  KRW = 'KRW', // Won sud-coréen
  TRY = 'TRY', // Livre turque
  RUB = 'RUB', // Rouble russe
  INR = 'INR', // Roupie indienne
  BRL = 'BRL', // Réal brésilien
  ZAR = 'ZAR', // Rand sud-africain
  AED = 'AED', // Dirham des Émirats
  ARS = 'ARS', // Peso argentin
  DKK = 'DKK', // Couronne danoise
  PLN = 'PLN', // Złoty polonais
  THB = 'THB', // Baht thaïlandais
  IDR = 'IDR', // Roupie indonésienne
  MYR = 'MYR', // Ringgit malaisien
  PHP = 'PHP', // Peso philippin
  HUF = 'HUF', // Forint hongrois
  CZK = 'CZK', // Couronne tchèque
  ILS = 'ILS', // Shekel israélien
  CLP = 'CLP', // Peso chilien
  BGN = 'BGN', // Lev bulgare
  VND = 'VND', // Dong vietnamien
  MAD = 'MAD', // Dirham marocain
  RON = 'RON', // Leu roumain
  EGP = 'EGP', // Livre égyptienne
  NGN = 'NGN', // Naira nigérian
  PKR = 'PKR', // Roupie pakistanaise
  KES = 'KES', // Shilling kényan
  MGA = 'MGA', // Ariary malgache
}

export enum EUserSortField {
  LASTNAME = 'lastname',
  FIRSTNAME = 'firstname',
  GENDER = 'gender',
  EMAIL = 'email',
}
