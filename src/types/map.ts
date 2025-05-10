export type Brewery = {
    lat: number;
    lng: number;
    name: string;
    address: string;
    type: string;
    phone?: string;
    website?: string;
}

export type BreweryMapProps = {
    businesses: Brewery[];
    userLocation: {
        lat: number;
        lng: number;
    };
}