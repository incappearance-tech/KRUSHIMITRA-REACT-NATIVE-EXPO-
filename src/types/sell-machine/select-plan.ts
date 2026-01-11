export interface IPlanFeature {
    icon: string;
    text: string;
    highlight?: boolean;
}

export interface IPlan {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    recommended?: boolean;
    featuredIcon?: string;
    features: IPlanFeature[];
}
