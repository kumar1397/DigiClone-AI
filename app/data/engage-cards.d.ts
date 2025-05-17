declare module "*/engage-cards.json" {
  interface Card {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
  }

  interface EngageCardsData {
    cards: Card[];
  }

  const data: EngageCardsData;
  export default data;
} 