export interface CryptoPrice {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
  eur: number;
  eur_market_cap: number;
  eur_24h_vol: number;
  eur_24h_change: number;
  gbp: number;
  gbp_market_cap: number;
  gbp_24h_vol: number;
  gbp_24h_change: number;
  ngn: number;
  usd_to_ngn_rate: number;
}

export interface CryptoHistory {
  _id: string;
  symbol: string;
  usd: number;
  eur: number;
  gbp: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PriceResponse {
  status: string;
  data: {
    prices: CryptoPrice;
  };
}

export interface HistoryResponse {
  status: string;
  data: {
    prices: CryptoHistory[];
  };
}
export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface TopCrypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
}

export interface TopCryptosResponse {
  status: string;
  data: {
    cryptos: TopCrypto[];
  };
}

