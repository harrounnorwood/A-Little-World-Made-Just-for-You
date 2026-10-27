export type PhotoItem = {
  image: string;
  title?: string;
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
  photoBookClosingTitle: "AND THAT'S MY BABY WIFEY.",
  photoBookClosingMessage: "From your childhood pictures to all your cute, girly, silly, angas, pogi, and pretty moments, every picture gives me another reason to love you. Maybe I started by admiring how beautiful you are, but somewhere along the way, I fell for every little side of you. And now, you're not just the girl I find pretty in pictures. You're my hev abi, my girlfriend, my wife, my favorite person, and the girl I want to keep making memories with. I LOVE YOU SO MUCH, MY LOVELOVEEE. ALWAYS REMEMBER THAT. 🫶🏻",
  photos: [
    { image: "/images/photos/2.jpg", title: "MY BABY GIRL IN HER GRADUATION 🤍", caption: "The first time I see this picture, I see a little girl in her kinder graduation outfit, looking so innocent and adorable. Little did I know that this cute little girl would grow up to become someone who would make my heart go like I'M SO INLOVE WITH YOU.", alt: "Jeriel in her Kinder graduation outfit", rotation: -3, tone: "rose" },
    { image: "/images/photos/1.jpg", title: "MY LITTLE RED RIDING HOOD", caption: "EXCUSE ME??? WHY ARE YOU SO CUTE IN THIS OUTFIT?  You look like a little fairytale character, but instead of getting lost in the woods, you somehow found your way into my heart", alt: "Memory photo 2", rotation: 2, tone: "cream" },
    { image: "/images/photos/3.jpg", title: "MY BABY AND THE TURTLE", caption: "WHY IS THIS SO CUTE? Just a random plushie toy you found at the mall, and maybe you thought it was cute enough to take a picture with it. It's such a simple, random little moment, but somehow, you made it adorable just by being in the picture.  Maybe the turtle caught your attention, but my attention will always be on YOU, my wifey. ", alt: "Memory photo 3", rotation: -2, tone: "peach" },
    { image: "/images/photos/4.jpg", title: "YOUR EYES AND EYEBROWS GOT ME DOWN BAD ", caption: "ARHHHH, YOUR EYES AND EYEBROWS!!! WHY ARE THEY SO PRETTY, I SWEAR. There's just something about the way your eyes look and how perfectly your eyebrows frame them that makes me so inlove with you. I don’t know how to explain it, but this picture really got me. Every time I look at it, I just find myself admiring your eyes and eyebrows all over again. Like, wifey HOW AM I SUPPOSED TO ACT NORMAL WHEN YOU HAVE THE PRETTIEST EYES AND EYEBROWS IN MY WORLD?!?", alt: "Memory photo 4", rotation: 4, tone: "lilac" },
    { image: "/images/photos/5.jpg", title: "MY ASTIG WIFEY ", caption: "Pogandaaa, THE ANGAS IS ANGASINGGG! You look so cool here, and I absolutely love this side of you. You're not just pretty; you have that cool aura that makes me wanna admire you even more. MY BABY CAN BE CUTE AND ASTIG AT THE SAME TIME UNFAIR. HUHUHU", alt: "Memory photo 5", rotation: -1, tone: "cream" },
    { image: "/images/photos/6.jpg", title: "YES, MA'AM! 🤍", caption: "MA'AM, YES, MA'AM! HAHAHAHA. You look like someone who could walk into a room and make everybody fix their posture. So classy, so pretty, so ma'am-coded, but still MY BABY hehe.", alt: "Memory photo 6", rotation: 3, tone: "rose" },
    { image: "/images/photos/7.jpg", title: "MY PINK TONGUE-OUT CUTIE ", caption: "THE PINK OUTFIT, THE LITTLE TONGUE, THE CUTENESS—HELP ME. You look so playful and adorable here, and I just wanna pinch your cheeks and tell you how cute you are. My pretty girl really knows how to make me smile without even knowing it. HAHAHAHAHA", alt: "Memory photo 7", rotation: -4, tone: "peach" },
    { image: "/images/photos/8.jpg", title: "MY PINK-SUIT HEARTTHROB ", caption: "Why are you so angas in pink. YOU LOOK SO POGI, SO COOL, AND SO FINE. How can someone wear pink and still serve this much attitude wifey, you're making me fall for you all over again, and honestly, I'm not even trying to resist anymore.", alt: "Memory photo 8", rotation: 2, tone: "lilac" },
    { image: "/images/photos/9.jpg", title: "MY JERSEY, MY POGANDA BABY ", caption: "WAIT LANGGG, YOU LOOK SO PRETTY AND SO POGI WEARING MY JERSEY. POGANDA IS AN UNDERSTATEMENT! Seeing you wear something of mine makes the picture feel even more special. You look so good in it, and now I'm convinced that my jersey looks a hundred times better on you. KEEP IT, BABY, YOU LOOK TOO GOOD IN IT. 🫶🏻", alt: "Memory photo 9", rotation: -2, tone: "cream" },
    { image: "/images/photos/10.jpg", title: "MY CUTIE BABY", caption: "LOOK AT YOUUU! JUST A RANDOM CUTE PICTURE OF YOU, BUT WHY DOES IT MAKE ME WANNA SQUEEZE YOUR CHEEKS? You're so adorable without even trying, and I'm just here falling harder for you.", alt: "Memory photo 10", rotation: 3, tone: "rose" },
    { image: "/images/photos/11.jpg", title: "THE RING I GAVE MY BABY", caption: "WAITTT, YOU'RE WEARING THE RING I GAVE YOU. This picture is extra special to me because it's not just about how cute you look with that filter. It's the little ring on your finger, something from me that you're wearing. It's such a small thing, but it makes my heart so happy knowing that a little piece of my love is with you. MY BABYYYY🫶🏻", alt: "Memory photo 11", rotation: -2, tone: "lilac" },
    { image: "/images/photos/12.jpg", title: "MY SILLY LITTLE LOVE 🤪", caption: "HAHAHAHAHA, WHAT IS THIS PICTURE, WIFEEEY?!? YOU'RE SO SILLY, AND I LOVE IT. I love that you can be pretty one moment and completely unserious the next. You don't always have to be perfect or look your best around me. I love your funny, weird, and playful side, too, because that's part of what makes you YOU.", alt: "Memory photo 12", rotation: 2, tone: "cream" },
    { image: "/images/photos/13.jpg", title: "THE BOWLING WIFEYY!", caption: "ARGHHHH, you look so astig, so pogi and so hot here. The way you’re holding that bowling ball, huhu. You're serving confidence, coolness, and girlfriend-material energy all at once. I might have to learn bowling just to have more reasons to admire you. HAHAHAHA.", alt: "Memory photo 13", rotation: -3, tone: "peach" },
    { image: "/images/photos/14.jpg", title: "PA-CUTE BUT STILL COOL 🫶🏻", caption: "WIFEYYY, ARE YOU TRYING TO BE CUTE OR COOL?!? BECAUSE YOU'RE LITERALLY BOTH.  That pose is giving pa-cute with a little bit of angas, and I'm giving you all my heart because how can my girl pull off both vibes so easily?!?", alt: "Memory photo 14", rotation: 3, tone: "rose" },
    { image: "/images/photos/15.jpg", title: "MY POGI NA CUTE GIRL HAHAHAHAHA", caption: "WHY ARE YOU SO POGI AND CUTE AT THE SAME TIME?!? You have that face that makes me wanna kiss you, tease you, admire you, and fall inlove with you all over again. MY GIRL, YOU'RE SO UNFAIR, HMPH!", alt: "Memory photo 15", rotation: -1, tone: "lilac" },
    { image: "/images/photos/16.jpg", title: "MY HEV ABI, MY GIRLFRIEND!", caption: "MY HEV ABIIII, MY GIRLFRIEND, MY BABYYYY.  Just seeing you here reminds me how lucky I am to call you mine. Out of all the people in this world, you're the girl who makes my heart feel this way. And if I could choose all over again, I'd still choose you, my pretty girl, every single time.", alt: "Memory photo 16", rotation: 4, tone: "cream" },
    { image: "/images/photos/17.jpg", title: "MY RANDOM LITTLE CUTIE ", caption: "Another random picture, another reason for me to be in love with you. You don't even have to pose perfectly or dress up to catch my attention. Sometimes, it's the simplest pictures of you that make me smile the most because it's just YOU, and that's already enough for me.", alt: "Memory photo 17", rotation: -4, tone: "peach" },
    { image: "/images/photos/18.jpg", title: "MY GIRLY GIRL", caption: "The girly side of my baby is showinggg! So pretty, so soft, so feminine, and so effortlessly beautiful. You have that kind of beauty that makes me stop for a moment and think, 'Grabe, girlfriend ko talaga 'to?'", alt: "Memory photo 18", rotation: 1, tone: "rose" },
    { image: "/images/photos/19.jpg", title: "OUR LITTLE PLUSHIE DOG FAMILY 🤍", caption: "AND LAST BUT DEFINITELY NOT THE LEAST, MY BABY WITH OUR LITTLE PLUSHIE DOG.  This picture feels so warm and special because it's you with our little plushie baby. It's such a cute little memory, but it's also one of those moments that makes me smile just thinking about us. Just you, me, and our tiny plushie dog—MY FAVORITE LITTLE FAMILY. ", alt: "Memory photo 19", rotation: -2, tone: "lilac" },
  ] satisfies PhotoItem[],
  flowers: [
    { image: "/images/flowers/flower%201.jpg", name: "A Bright Little Bouquet", description: "Colorful blooms, picked just to make you smile.", note: "A little bunch of flowers for my favorite person. I hope they bring a smile to your day." },
    { image: "/images/flowers/flower%202.jpg", name: "Flowers & a Tiny Friend", description: "A sweet bouquet with the cutest little companion.", note: "Flowers are lovely, but this tiny friend makes the bouquet extra adorable—just like you." },
    { image: "/images/flowers/flower%203.jpg", name: "The Lavender Bouquet", description: "Soft purples and pinks wrapped up with love.", note: "A gentle little reminder that you deserve all the lovely things in the world." },
    { image: "/images/flowers/flower%204.jpg", name: "A Bouquet Full of Love", description: "Bright blooms, heart balloons, and two teddy bears.", note: "A whole bouquet of love, with a couple of tiny bears to keep it company." },
    { image: "/images/flowers/flower%205.jpg", name: "Sunshine in Yellow", description: "A cheerful bouquet wrapped in sunny yellow.", note: "A little sunshine for you, on your birthday and every day after." },
  ] satisfies FlowerItem[],
  letters: [
    { title: "A birthday note", teaser: "Open when you're ready", body: "[Write a personal birthday message here.]", color: "pink" },
    { title: "A note for later", teaser: "Open when you need a smile", body: "[Write a personal note here.]", color: "gold" },
    { title: "A wish for your year", teaser: "A wish folded just for you", body: "[Add a birthday wish here.]", color: "lavender" },
  ] satisfies LetterItem[],
};
