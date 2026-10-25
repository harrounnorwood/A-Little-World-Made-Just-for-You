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
  websiteTitle: "Haezel ♡",
  senderName: "Haezel",
  recipientName: "[Recipient name]",
  recipientNickname: "my Wifey",
  accessPasscode: "10-29-07",
  welcomeGreeting: "A little world made just for you, My Jeriel.",
  intro: "A little birthday surprise made just for you.",
  playlistTitle: "Songs That Remind Me of You",
  playlistDescription: "A soundtrack for this little birthday world.",
  playlistUrl: "https://open.spotify.com/playlist/22CHRCHAFPxIkNdwI9Rgl4",
  finalHeadline: "Happy Birthday, {nickname}!",
  finalMessage: "[Add your personal birthday message here.]",
  photos: [
    { image: "/images/photos/1.jpg", caption: "[Add caption for photo 1.]", alt: "Memory photo 1", rotation: -3, tone: "rose" },
    { image: "/images/photos/2.jpg", caption: "[Add caption for photo 2.]", alt: "Memory photo 2", rotation: 2, tone: "cream" },
    { image: "/images/photos/3.jpg", caption: "[Add caption for photo 3.]", alt: "Memory photo 3", rotation: -2, tone: "peach" },
    { image: "/images/photos/4.jpg", caption: "[Add caption for photo 4.]", alt: "Memory photo 4", rotation: 4, tone: "lilac" },
    { image: "/images/photos/5.jpg", caption: "[Add caption for photo 5.]", alt: "Memory photo 5", rotation: -1, tone: "cream" },
    { image: "/images/photos/6.jpg", caption: "[Add caption for photo 6.]", alt: "Memory photo 6", rotation: 3, tone: "rose" },
    { image: "/images/photos/7.jpg", caption: "[Add caption for photo 7.]", alt: "Memory photo 7", rotation: -4, tone: "peach" },
    { image: "/images/photos/8.jpg", caption: "[Add caption for photo 8.]", alt: "Memory photo 8", rotation: 2, tone: "lilac" },
    { image: "/images/photos/9.jpg", caption: "[Add caption for photo 9.]", alt: "Memory photo 9", rotation: -2, tone: "cream" },
    { image: "/images/photos/10.jpg", caption: "[Add caption for photo 10.]", alt: "Memory photo 10", rotation: 3, tone: "rose" },
    { image: "/images/photos/11.jpg", caption: "[Add caption for photo 11.]", alt: "Memory photo 11", rotation: -2, tone: "lilac" },
    { image: "/images/photos/12.jpg", caption: "[Add caption for photo 12.]", alt: "Memory photo 12", rotation: 2, tone: "cream" },
    { image: "/images/photos/13.jpg", caption: "[Add caption for photo 13.]", alt: "Memory photo 13", rotation: -3, tone: "peach" },
    { image: "/images/photos/14.jpg", caption: "[Add caption for photo 14.]", alt: "Memory photo 14", rotation: 3, tone: "rose" },
    { image: "/images/photos/15.jpg", caption: "[Add caption for photo 15.]", alt: "Memory photo 15", rotation: -1, tone: "lilac" },
    { image: "/images/photos/16.jpg", caption: "[Add caption for photo 16.]", alt: "Memory photo 16", rotation: 4, tone: "cream" },
    { image: "/images/photos/17.jpg", caption: "[Add caption for photo 17.]", alt: "Memory photo 17", rotation: -4, tone: "peach" },
    { image: "/images/photos/18.jpg", caption: "[Add caption for photo 18.]", alt: "Memory photo 18", rotation: 1, tone: "rose" },
    { image: "/images/photos/19.jpg", caption: "[Add caption for photo 19.]", alt: "Memory photo 19", rotation: -2, tone: "lilac" },
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
