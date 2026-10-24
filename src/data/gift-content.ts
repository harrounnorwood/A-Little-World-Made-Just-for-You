export type PhotoItem = {
  image: string;
  caption: string;
  alt: string;
  rotation: number;
  tone: string;
};

export type FlowerItem = {
  image: string;
  name: string;
  description: string;
  note: string;
};

export type LetterItem = {
  title: string;
  teaser: string;
  body: string;
  color: string;
};

export const giftContent = {
  websiteTitle: "Everglow",
  senderName: "Haezel",
  recipientName: "[Recipient name]",
  recipientNickname: "Wifey",
  welcomeGreeting: "A little world made just for you",
  intro: "A little birthday surprise made just for you.",
  playlistTitle: "Songs That Remind Me of You",
  playlistDescription: "Add your Spotify or YouTube playlist link here when your perfect soundtrack is ready.",
  playlistUrl: "",
  finalHeadline: "Happy Birthday, {nickname}!",
  finalMessage: "[Add your personal birthday message here.]",
  photos: [
    { image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=85", caption: "[Add caption for photo 1.]", alt: "Pink roses in soft light", rotation: -3, tone: "rose" },
    { image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85", caption: "[Add caption for photo 2.]", alt: "Friends celebrating together", rotation: 2, tone: "cream" },
    { image: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=900&q=85", caption: "[Add caption for photo 3.]", alt: "Person standing in a sunny field", rotation: -2, tone: "peach" },
    { image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=85", caption: "[Add caption for photo 4.]", alt: "Two people laughing outdoors", rotation: 4, tone: "lilac" },
  ] satisfies PhotoItem[],
  flowers: [
    { image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85", name: "The Blush Bouquet", description: "Soft blooms for the softest heart.", note: "Replace this image with a photo of the real bouquet." },
    { image: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?auto=format&fit=crop&w=900&q=85", name: "Golden Hour Daisies", description: "A little sunshine in flower form.", note: "Add a personal note about why you chose these flowers." },
    { image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85", name: "Garden Roses", description: "Romantic, classic, and impossible not to love.", note: "This sample card is ready for your own flower photo." },
  ] satisfies FlowerItem[],
  letters: [
    { title: "A birthday note", teaser: "Open when you're ready", body: "[Write a personal birthday message here.]", color: "pink" },
    { title: "A note for later", teaser: "Open when you need a smile", body: "[Write a personal note here.]", color: "gold" },
    { title: "A wish for your year", teaser: "A wish folded just for you", body: "[Add a birthday wish here.]", color: "lavender" },
  ] satisfies LetterItem[],
};
