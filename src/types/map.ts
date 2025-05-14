export type Brewery = {
    lat: number;
    lng: number;
    name: string;
    type: string;
    phone?: string;
    website?: string;
    address?: string;
}

export type BreweryMapProps = {
    businesses: Brewery[];
    userLocation: {
        lat: number;
        lng: number;
    } | null;
}

export type OsmTags = {
    [key: string]: string;
};

export interface OsmNode {
    type: "node";
    id: number;
    lat: number;
    lon: number;
    tags?: OsmTags;
}

export interface OsmWay {
    type: "way";
    id: number;
    nodes: number[];
    tags?: OsmTags;
    center?: {
        lat: number;
        lon: number;
    };
}