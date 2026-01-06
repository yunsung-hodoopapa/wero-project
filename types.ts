export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  client: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
}

export interface AIPlanningResult {
  conceptName: string;
  slogan: string;
  description: string;
  keyVisualIdeas: string[];
  programFlow: string[];
}