"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Cake, Camera, Check, ChevronRight, Eye, EyeOff, Expand, Flower2, Gift, Heart, Mail, Mic, Music2, Pause, Play, Puzzle, RotateCcw, Sparkles, X } from "lucide-react";
import { giftContent, type FlowerItem, type PhotoItem } from "../src/data/gift-content";

type Section = "menu" | "music" | "flowers" | "pictures" | "messages" | "voice" | "game" | "surprise";

const storyPageVariants: Variants = {
  enter: (direction: number = 1) => ({ opacity: 0, x: direction * 35, rotateY: direction * -4 }),
  center: { opacity: 1, x: 0, rotateY: 0 },
  exit: (direction: number = 1) => ({ opacity: 0, x: direction * -35, rotateY: direction * 4 }),
};

function formatBirthdayPasscode(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
}

const cardData = [
  { id: "music" as const, title: "Music", subtitle: "Our little soundtrack", icon: Music2, className: "card-music" },
  { id: "flowers" as const, title: "Flowers", subtitle: "A bouquet in pixels", icon: Flower2, className: "card-flowers" },
  { id: "pictures" as const, title: "Pictures", subtitle: "Favorite little moments", icon: Camera, className: "card-pictures" },
  { id: "messages" as const, title: "Messages", subtitle: "Open when you need love", icon: Mail, className: "card-messages" },
  { id: "voice" as const, title: "Voice Message", subtitle: "A little message from me", icon: Mic, className: "card-voice" },
  { id: "game" as const, title: "Word Hunt", subtitle: "Find the hidden words", icon: Puzzle, className: "card-game" },
];

type WordHuntCell = { row: number; column: number };
type WordHuntBoard = { letters: string[][]; paths: Record<string, WordHuntCell[]> };
type WordHuntLine = { start: { x: number; y: number }; end: { x: number; y: number }; width: number; height: number; found: boolean };

function normalizeWordHuntWord(word: string) {
  return word.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

function createWordHuntBoard(words: string[], size: number): WordHuntBoard {
  const preferredDirections = [
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, 0],
    [-1, 1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [-1, -1],
    [0, 1],
  ] as const;
  let seed = 20261027;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const placementOrder = words.map((displayWord, index) => ({
    word: normalizeWordHuntWord(displayWord),
    index,
  })).sort((first, second) => second.word.length - first.word.length);
  if (placementOrder.some(({ word }) => word.length > size)) {
    const tooLongWord = placementOrder.find(({ word }) => word.length > size)?.word;
    throw new Error(`Word "${tooLongWord}" is longer than the word hunt grid.`);
  }

  let letters: string[][] = [];
  let paths: Record<string, WordHuntCell[]> = {};
  let placedAllWords = false;

  for (let attempt = 0; attempt < 100 && !placedAllWords; attempt += 1) {
    letters = Array.from({ length: size }, () => Array<string>(size).fill(""));
    paths = {};
    placedAllWords = true;

    for (const { word, index: wordIndex } of placementOrder) {
      const [rowStep, columnStep] = preferredDirections[wordIndex % preferredDirections.length];
      const candidates: WordHuntCell[][] = [];

      for (let row = 0; row < size; row += 1) {
        for (let column = 0; column < size; column += 1) {
          const endRow = row + rowStep * (word.length - 1);
          const endColumn = column + columnStep * (word.length - 1);
          if (endRow < 0 || endRow >= size || endColumn < 0 || endColumn >= size) continue;
          candidates.push(Array.from({ length: word.length }, (_, index) => ({
            row: row + rowStep * index,
            column: column + columnStep * index,
          })));
        }
      }

      for (let index = candidates.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [candidates[index], candidates[swapIndex]] = [candidates[swapIndex], candidates[index]];
      }

      const path = candidates.find((candidate) => candidate.every((cell) => !letters[cell.row][cell.column]));
      if (!path) {
        placedAllWords = false;
        break;
      }
      path.forEach((cell, index) => { letters[cell.row][cell.column] = word[index]; });
      paths[word] = path;
    }
  }

  if (!placedAllWords) throw new Error("Could not place all words in the word hunt grid.");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  letters.forEach((row) => row.forEach((letter, column) => {
    if (!letter) letter = alphabet[Math.floor(random() * alphabet.length)];
    row[column] = letter;
  }));
  return { letters, paths };
}

const wordHuntGridSize = 17;
const wordHuntBoard = createWordHuntBoard(giftContent.wordHuntWords, wordHuntGridSize);

export default function Home() {
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [started, setStarted] = useState(false);
  const [section, setSection] = useState<Section>("menu");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [selectedFlower, setSelectedFlower] = useState<FlowerItem | null>(null);
  const [openedLetter, setOpenedLetter] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState(0);

  const goMenu = () => { setSection("menu"); setSelectedPhotoIndex(null); setSelectedFlower(null); setOpenedLetter(null); };
  const openGift = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passcode.replace(/\D/g, "") === giftContent.accessPasscode.replace(/\D/g, "")) {
      setPasscodeError("");
      setStarted(true);
      return;
    }
    setPasscodeError("That code didn’t unlock the gift. Try again.");
  };

  return (
    <main className={section === "surprise" ? "app-shell surprise-shell" : "app-shell"}>
      <Decorations />
      <AnimatePresence mode="wait">
        {!started ? (
          <WelcomeScreen key="welcome" passcode={passcode} error={passcodeError} onChange={(value) => { setPasscode(value); setPasscodeError(""); }} onSubmit={openGift} />
        ) : section === "menu" ? (
          <Menu key="menu" onNavigate={setSection} />
        ) : section === "music" ? (
          <MusicSection key="music" onBack={goMenu} />
        ) : section === "flowers" ? (
          <FlowersSection key="flowers" onBack={goMenu} onSelect={setSelectedFlower} />
        ) : section === "pictures" ? (
          <PicturesSection key="pictures" onBack={goMenu} onSelect={(photo) => setSelectedPhotoIndex(giftContent.photos.findIndex(({ image }) => image === photo.image))} />
        ) : section === "messages" ? (
          <MessagesSection key="messages" onBack={goMenu} openedLetter={openedLetter} setOpenedLetter={setOpenedLetter} />
        ) : section === "voice" ? (
          <VoiceMessageSection key="voice" onBack={goMenu} />
        ) : section === "game" ? (
          <WordHuntSection key="game" onBack={goMenu} />
        ) : (
          <BirthdayReveal key={replayKey} onBack={goMenu} onReplay={() => setReplayKey((key) => key + 1)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedPhotoIndex !== null && <PhotoLightbox photos={giftContent.photos} index={selectedPhotoIndex} onNavigate={setSelectedPhotoIndex} onClose={() => setSelectedPhotoIndex(null)} />}
        {selectedFlower && <FlowerModal flower={selectedFlower} onClose={() => setSelectedFlower(null)} />}
      </AnimatePresence>
    </main>
  );
}

function PageTransition({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={`page ${className}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }}>{children}</motion.div>;
}

function WelcomeScreen({ passcode, error, onChange, onSubmit }: { passcode: string; error: string; onChange: (value: string) => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  const [showPasscode, setShowPasscode] = useState(false);

  return <PageTransition className="welcome-page">
    <div className="eyebrow"><Sparkles size={15} /> A birthday gift for {giftContent.recipientNickname}</div>
    <motion.div className="hero-gift" animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4 }}>
      <div className="gift-glow" /><Gift size={78} strokeWidth={1.2} /><Heart className="gift-heart" fill="currentColor" size={28} />
    </motion.div>
    <p className="script-text">for someone very special</p>
    <h1>{giftContent.welcomeGreeting}</h1>
    <p className="lead">{giftContent.intro}</p>
    <form className="welcome-passcode-form" onSubmit={onSubmit}>
      <label htmlFor="birthday-passcode">Enter your birthday to open your gift</label>
      <div className="passcode-input-wrap">
        <input id="birthday-passcode" type={showPasscode ? "text" : "password"} inputMode="numeric" autoComplete="off" maxLength={8} placeholder="MM-DD-YY" value={passcode} onChange={(event) => onChange(formatBirthdayPasscode(event.target.value))} aria-describedby={error ? "passcode-error" : undefined} aria-invalid={Boolean(error)} />
        <button className="passcode-visibility" type="button" onClick={() => setShowPasscode((visible) => !visible)} aria-label={showPasscode ? "Hide passcode" : "Show passcode"} aria-pressed={showPasscode}>
          {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="passcode-error" id="passcode-error" role="alert">{error}</p>}
      <button className="primary-button" type="submit">Open Your Gift <Heart size={17} fill="currentColor" /></button>
    </form>
    <p className="small-note">made with love by {giftContent.senderName} ♡</p>
  </PageTransition>;
}

function Menu({ onNavigate }: { onNavigate: (section: Section) => void }) {
  return <PageTransition className="menu-page">
    <header className="topbar"><div className="brand"><span className="brand-mark">e</span><span>{giftContent.websiteTitle}</span></div><span className="topbar-note">a little world for {giftContent.recipientNickname}</span></header>
    <section className="menu-intro"><p className="eyebrow"><Sparkles size={15} /> Pick a little something</p><h2>Explore your <em>birthday</em> gift</h2><p>Take your time. There&apos;s no wrong place to start.</p></section>
    <div className="card-grid">{cardData.map(({ id, title, subtitle, icon: Icon, className }) => <motion.button key={id} className={`gift-card ${className}`} onClick={() => onNavigate(id)} whileHover={{ y: -7, rotate: id === "pictures" ? -1 : 1 }} whileTap={{ scale: 0.97 }} aria-label={`Open ${title} section`}><span className="card-icon"><Icon size={26} /></span><span className="card-title">{title}</span><span className="card-subtitle">{subtitle}</span><ChevronRight className="card-arrow" size={18} /></motion.button>)}</div>
    <button className="surprise-button" onClick={() => onNavigate("surprise")}><span><Sparkles size={17} /> One Last Surprise</span><span className="surprise-arrow">→</span></button>
    <footer className="menu-footer"><Heart size={13} fill="currentColor" /> made for a day worth remembering</footer>
  </PageTransition>;
}

function SectionHeader({ title, kicker, onBack }: { title: string; kicker: string; onBack: () => void }) {
  return <header className="section-header"><button className="back-button" onClick={onBack} aria-label="Back to main menu"><ArrowLeft size={17} /> Back</button><p className="eyebrow">{kicker}</p><h2>{title}</h2></header>;
}

function MusicSection({ onBack }: { onBack: () => void }) {
  const [recordSpinning, setRecordSpinning] = useState(false);
  const playlistUrl = giftContent.playlistUrl.trim();
  let embedUrl: string | null = null;
  let externalUrl: string | null = null;

  try {
    const url = new URL(playlistUrl);
    if (url.protocol === "https:" && url.hostname === "open.spotify.com") {
      const spotifyPlaylist = url.pathname.match(/^\/playlist\/([^/]+)\/?$/);
      if (spotifyPlaylist) {
        embedUrl = `https://open.spotify.com/embed/playlist/${spotifyPlaylist[1]}`;
        externalUrl = url.href;
      }
    } else if (url.protocol === "https:" && (url.hostname === "youtube.com" || url.hostname === "www.youtube.com")) {
      const playlistId = url.searchParams.get("list");
      if (url.pathname === "/playlist" && playlistId) {
        embedUrl = `https://www.youtube.com/embed?list=${encodeURIComponent(playlistId)}`;
        externalUrl = url.href;
      }
    }
  } catch {
    if (playlistUrl) console.error("Invalid playlist URL in gift-content.ts");
  }

  return <PageTransition className="content-page"><SectionHeader title={giftContent.playlistTitle} kicker="♪ your soundtrack" onBack={onBack} /><div className="music-layout"><aside className="record-art"><button type="button" className="record-button" onClick={() => setRecordSpinning((spinning) => !spinning)} aria-label={recordSpinning ? "Stop record animation" : "Spin the record"} aria-pressed={recordSpinning}><span className={`record${recordSpinning ? " is-spinning" : ""}`}><span className={`record-label${recordSpinning ? " is-beating" : ""}`}><Heart size={25} fill="currentColor" /></span></span></button><span className="record-caption">side A · memories in melody</span><p className="record-note">{recordSpinning ? "Spinning with love ♡" : "Tap the record to give it a spin."}</p></aside><section className="music-player-card"><div className="music-player-heading"><span className="playlist-badge"><Music2 size={14} /> YOUR PLAYLIST</span><p>{giftContent.playlistDescription}</p></div>{embedUrl ? <div className="embed-wrap"><iframe title="Romantic playlist" src={embedUrl} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /></div> : <div className="playlist-placeholder"><Music2 size={28} /><strong>Your playlist will live here</strong><span>Add a valid Spotify or YouTube playlist URL in <code>src/data/gift-content.ts</code>.</span></div>}{externalUrl && <a className="text-link" href={externalUrl} target="_blank" rel="noreferrer">Open playlist in a new tab <ArrowRight size={15} /></a>}</section></div></PageTransition>;
}

function FlowersSection({ onBack, onSelect }: { onBack: () => void; onSelect: (flower: FlowerItem) => void }) {
  return <PageTransition className="content-page"><SectionHeader title="Flowers for your joy" kicker="✿ something blooming" onBack={onBack} /><p className="section-lead">A digital garden inspired by the real flowers waiting for you.</p><div className="flower-grid">{giftContent.flowers.map((flower) => <motion.button key={flower.name} className="flower-card" onClick={() => onSelect(flower)} whileHover={{ y: -5 }}><img src={flower.image} alt={flower.name} /><span className="flower-card-body"><strong>{flower.name}</strong><span>{flower.description}</span><small>tap to open note ·</small></span></motion.button>)}</div></PageTransition>;
}

function PicturesSection({ onBack, onSelect }: { onBack: () => void; onSelect: (photo: PhotoItem) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const pointerStart = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const photos = giftContent.photos;
  const isClosingPage = currentIndex === photos.length;
  const currentPhoto = photos[Math.min(currentIndex, photos.length - 1)];

  const goToPage = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex > photos.length || nextIndex === currentIndex) return;
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentIndex(nextIndex);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 45) {
      suppressClick.current = true;
      goToPage(currentIndex + (distance < 0 ? 1 : -1));
    }
  };

  const handlePageClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    goToPage(currentIndex + (isClosingPage ? -1 : 1));
  };

  const hasStory = Boolean(currentPhoto.title && !currentPhoto.caption.startsWith("[Add caption"));

  return <PageTransition className="content-page"><SectionHeader title="Little moments of you" kicker="♡ the scrapbook" onBack={onBack} /><p className="section-lead">{isOpen ? "Turn each page and take your time with the memories." : "A little keepsake, filled with moments I hold close."}</p>{!isOpen ? <motion.button type="button" className="storybook-cover" onClick={() => setIsOpen(true)} aria-label={`Open the photo album for ${giftContent.recipientNickname}`} initial={{ opacity: 0, y: 12, rotateY: -3 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}>
    <span className="storybook-cover-inner">
      <span className="storybook-cover-photo"><img src={photos[0].image} alt="" draggable={false} /><span className="storybook-cover-tape" /></span>
      <span className="storybook-cover-title">Our little<br /><em>moments</em></span>
      <span className="storybook-cover-dedication">for {giftContent.recipientNickname}, with love</span>
      <span className="storybook-cover-open">Open the album <ArrowRight size={15} /></span>
    </span>
  </motion.button> : <section className="storybook" aria-label="Photo storybook">
    <div className="storybook-book">
      <span className="storybook-spine" aria-hidden="true" />
      <div className="storybook-page-number">{isClosingPage ? <>THE LAST PAGE <span>A NOTE FOR YOU</span></> : <>MEMORY {String(currentIndex + 1).padStart(2, "0")} <span>OF {String(photos.length).padStart(2, "0")}</span></>}</div>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {isClosingPage ? <motion.button key="closing-note" type="button" className="storybook-page storybook-closing-note" onClick={handlePageClick} onPointerDown={(event) => { pointerStart.current = event.clientX; }} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null; }} aria-label={`${giftContent.photoBookClosingTitle} ${giftContent.photoBookClosingMessage} Swipe right to return to the last photo.`} custom={direction} variants={storyPageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
          <span className="storybook-closing-mark" aria-hidden="true"><Heart size={25} fill="currentColor" /></span>
          <span className="storybook-closing-title">{giftContent.photoBookClosingTitle}</span>
          <span className="storybook-closing-message">{giftContent.photoBookClosingMessage}</span>
          <span className="storybook-turn-hint"><ArrowLeft size={14} /> swipe right to revisit the last photo</span>
        </motion.button> : <motion.button key={currentIndex} type="button" className={`storybook-page${currentPhoto.title ? " has-title" : ""}${hasStory ? " has-story" : ""}`} onClick={handlePageClick} onPointerDown={(event) => { pointerStart.current = event.clientX; }} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null; }} aria-label={`Memory ${currentIndex + 1}: ${currentPhoto.title ? `${currentPhoto.title}. ` : ""}${currentPhoto.caption}. Tap to turn the page.`} custom={direction} variants={storyPageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
          <span className="storybook-photo-frame"><img src={currentPhoto.image} alt={currentPhoto.alt} draggable={false} /><span className="storybook-photo-mark">♡</span></span>
          <span className="storybook-caption-label">{currentPhoto.title ?? "A LITTLE MEMORY"}</span>
          <span className={`storybook-caption${hasStory ? " storybook-story-body" : ""}`}>{currentPhoto.caption}</span>
          <span className="storybook-turn-hint">tap or swipe to turn the page <ArrowRight size={14} /></span>
        </motion.button>}
      </AnimatePresence>
      {!isClosingPage && <button type="button" className="storybook-view-photo" onClick={() => onSelect(currentPhoto)} aria-label="View this photo full size"><Expand size={17} /></button>}
    </div>
    <div className="storybook-controls">
      <button type="button" className="storybook-nav" onClick={() => goToPage(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Previous page"><ArrowLeft size={17} /> Previous</button>
      <div className="storybook-dots" aria-label="Choose a memory">{photos.map((photo, index) => <button key={`${photo.caption}-${index}`} type="button" className={`storybook-dot${index === currentIndex || (isClosingPage && index === photos.length - 1) ? " is-active" : ""}`} onClick={() => goToPage(index)} aria-label={`Go to memory ${index + 1}`} aria-current={index === currentIndex || (isClosingPage && index === photos.length - 1) ? "step" : undefined} />)}</div>
      <button type="button" className="storybook-nav" onClick={() => goToPage(currentIndex + 1)} disabled={isClosingPage} aria-label="Next page">Next <ArrowRight size={17} /></button>
    </div>
    <p className="storybook-footer">{isClosingPage ? "The end of the pictures, but never the story." : "Every picture holds a little piece of the story."}</p>
  </section>}</PageTransition>;
}

function MessagesSection({ onBack, openedLetter, setOpenedLetter }: { onBack: () => void; openedLetter: number | null; setOpenedLetter: (value: number | null) => void }) {
  return <PageTransition className="content-page"><SectionHeader title="Letters for later" kicker="✉ words from the heart" onBack={onBack} /><p className="section-lead">Open one whenever you need a reminder of how loved you are.</p><div className="letter-grid">{giftContent.letters.map((letter, index) => <motion.button key={letter.title} className={`letter-card ${letter.color} ${openedLetter === index ? "is-open" : ""}`} onClick={() => setOpenedLetter(openedLetter === index ? null : index)} whileTap={{ scale: 0.98 }}><span className="letter-top"><Mail size={34} /><span className="letter-stamp">♡</span></span>{openedLetter === index ? <span className="letter-body"><strong>{letter.title}</strong><span>{letter.body}</span><small>With love, {giftContent.senderName} ♡</small><small>tap to fold away</small></span> : <span className="letter-teaser"><strong>{letter.title}</strong><span>{letter.teaser}</span><small>tap to open ·</small></span>}</motion.button>)}</div></PageTransition>;
}

function VoiceMessageSection({ onBack }: { onBack: () => void }) {
  const [audioError, setAudioError] = useState("");

  return <PageTransition className="content-page"><SectionHeader title="A voice message for you" kicker="♡ a little something to hear" onBack={onBack} /><section className="voice-message-card">
    <span className="voice-message-icon"><Mic size={27} /></span>
    <h3>A message, in my own voice</h3>
    <p>{giftContent.voiceMessageDescription}</p>
    {giftContent.voiceMessageUrl ? <audio className="voice-message-player" controls preload="metadata" src={giftContent.voiceMessageUrl} onError={() => setAudioError("The voice recording could not be loaded. Check the file path in gift-content.ts.")}>Your browser does not support audio playback.</audio> : <div className="voice-message-missing"><strong>Your recording goes here</strong><span>Add your audio file at <code>public/audio/voice-message.mp3</code>, then set <code>voiceMessageUrl</code> in <code>src/data/gift-content.ts</code> to <code>/audio/voice-message.mp3</code>.</span></div>}
    {audioError && <p className="voice-message-error" role="alert">{audioError}</p>}
  </section></PageTransition>;
}

function WordHuntSection({ onBack }: { onBack: () => void }) {
  const [tapStart, setTapStart] = useState<WordHuntCell | null>(null);
  const [selectedPath, setSelectedPath] = useState<WordHuntCell[]>([]);
  const [selectionLine, setSelectionLine] = useState<WordHuntLine | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; start: WordHuntCell } | null>(null);
  const [message, setMessage] = useState("Drag from the first letter to the last. Words can go across, up and down, or diagonal.");
  const normalizedWords = giftContent.wordHuntWords.map(normalizeWordHuntWord);
  const foundCells = new Set(foundWords.flatMap((word) => wordHuntBoard.paths[word].map(({ row, column }) => `${row}-${column}`)));
  const selectedCells = new Set(selectedPath.map(({ row, column }) => `${row}-${column}`));

  const getPath = (start: WordHuntCell, end: WordHuntCell) => {
    const rowDistance = end.row - start.row;
    const columnDistance = end.column - start.column;
    const steps = Math.max(Math.abs(rowDistance), Math.abs(columnDistance));
    if (steps === 0) return [start];

    const rowStep = rowDistance === 0 ? 0 : rowDistance / steps;
    const columnStep = columnDistance === 0 ? 0 : columnDistance / steps;
    if (![0, 1, -1].includes(rowStep) || ![0, 1, -1].includes(columnStep)) return null;

    return Array.from({ length: steps + 1 }, (_, index) => ({
      row: start.row + rowStep * index,
      column: start.column + columnStep * index,
    }));
  };

  const finishSelection = (path: WordHuntCell[]) => {
    setTapStart(null);
    const selectedWord = path.map(({ row, column }) => wordHuntBoard.letters[row][column]).join("");
    const match = normalizedWords.find((word) => word === selectedWord || word === [...selectedWord].reverse().join(""));

    setSelectedPath(path);
    if (!match) {
      setSelectionLine((line) => line ? { ...line, found: false } : null);
      setMessage("Not one of the hidden words. Try another line!");
      return;
    }
    if (foundWords.includes(match)) {
      setSelectionLine((line) => line ? { ...line, found: true } : null);
      setMessage("You already found that one! Look for another word.");
      return;
    }

    const updatedWords = [...foundWords, match];
    setFoundWords(updatedWords);
    setSelectionLine((line) => line ? { ...line, found: true } : null);
    setMessage(updatedWords.length === normalizedWords.length ? "You found them all! Happy birthday, love! ♡" : `You found “${giftContent.wordHuntWords[normalizedWords.indexOf(match)]}”! Keep going!`);
  };

  const getCellAtPoint = (x: number, y: number) => {
    const element = document.elementFromPoint(x, y)?.closest<HTMLButtonElement>(".word-hunt-cell");
    if (!element || !gridRef.current?.contains(element)) return null;
    return { row: Number(element.dataset.row), column: Number(element.dataset.column) };
  };

  const getCellCenter = (cell: WordHuntCell) => {
    const grid = gridRef.current;
    const element = grid?.querySelector<HTMLButtonElement>(`[data-row="${cell.row}"][data-column="${cell.column}"]`);
    if (!grid || !element) return null;
    const gridRect = grid.getBoundingClientRect();
    const cellRect = element.getBoundingClientRect();
    return { x: cellRect.left + cellRect.width / 2 - gridRect.left, y: cellRect.top + cellRect.height / 2 - gridRect.top, width: gridRect.width, height: gridRect.height };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLButtonElement>(".word-hunt-cell") : null;
    if (!target || !gridRef.current) return;
    event.preventDefault();
    const start = { row: Number(target.dataset.row), column: Number(target.dataset.column) };
    const center = getCellCenter(start);
    if (!center) return;
    dragRef.current = { pointerId: event.pointerId, start };
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedPath([start]);
    setSelectionLine({ start: center, end: center, width: center.width, height: center.height, found: false });
    setMessage("Keep dragging in a straight line to the last letter.");
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const end = getCellAtPoint(event.clientX, event.clientY);
    if (!end) return;
    const path = getPath(drag.start, end);
    if (!path) {
      setSelectedPath([drag.start]);
      setSelectionLine((line) => line ? { ...line, end: line.start } : null);
      return;
    }

    const center = getCellCenter(end);
    if (!center) return;
    setSelectedPath(path);
    setSelectionLine((line) => line ? { ...line, end: { x: center.x, y: center.y } } : null);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);

    const end = getCellAtPoint(event.clientX, event.clientY);
    const dragPath = end ? getPath(drag.start, end) : null;
    if (!dragPath || dragPath.length < 2) {
      if (end && tapStart) {
        const tapPath = getPath(tapStart, end);
        if (tapPath && tapPath.length > 1) {
          setSelectedPath(tapPath);
          const startCenter = getCellCenter(tapStart);
          const endCenter = getCellCenter(end);
          if (startCenter && endCenter) {
            setSelectionLine({ start: startCenter, end: { x: endCenter.x, y: endCenter.y }, width: startCenter.width, height: startCenter.height, found: false });
          }
          finishSelection(tapPath);
          return;
        }
        setTapStart(end);
        setSelectedPath([end]);
        const center = getCellCenter(end);
        setSelectionLine((line) => line && center ? { ...line, start: center, end: center } : null);
        setMessage("Those letters are not in a straight line. Choose a new first letter.");
        return;
      }

      if (end) {
        setTapStart(end);
        setSelectedPath([end]);
        setMessage("First letter selected. Tap the last letter, or drag to select the word.");
        return;
      }

      setSelectedPath([]);
      setSelectionLine(null);
      setMessage("Drag across at least two letters to select a word.");
      return;
    }
    setTapStart(null);
    setSelectedPath(dragPath);
    finishSelection(dragPath);
  };

  const handlePointerCancel = () => {
    dragRef.current = null;
    setTapStart(null);
    setSelectedPath([]);
    setSelectionLine(null);
  };

  const resetGame = () => {
    dragRef.current = null;
    setTapStart(null);
    setSelectedPath([]);
    setSelectionLine(null);
    setFoundWords([]);
    setMessage("Drag from the first letter to the last. Words can go across, up and down, or diagonal.");
  };

  return <PageTransition className="content-page"><SectionHeader title="A little word hunt" kicker="♡ a game just for you" onBack={onBack} /><p className="section-lead">Find the birthday wishes hidden in the letters. Drag to connect a word, or tap its first and last letters.</p><div className="word-hunt-layout">
    <section className="word-hunt-board-wrap" aria-label="Word hunt puzzle">
      <div ref={gridRef} className="word-hunt-grid" role="group" aria-label="Letter grid" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerCancel}>
        {selectionLine && <svg className="word-hunt-selection-line" viewBox={`0 0 ${selectionLine.width} ${selectionLine.height}`} preserveAspectRatio="none" aria-hidden="true"><line x1={selectionLine.start.x} y1={selectionLine.start.y} x2={selectionLine.end.x} y2={selectionLine.end.y} className={selectionLine.found ? "is-found" : ""} /><circle cx={selectionLine.start.x} cy={selectionLine.start.y} r="12" className={selectionLine.found ? "is-found" : ""} /><circle cx={selectionLine.end.x} cy={selectionLine.end.y} r="12" className={selectionLine.found ? "is-found" : ""} /></svg>}
        {wordHuntBoard.letters.map((row, rowIndex) => row.map((letter, columnIndex) => {
        const key = `${rowIndex}-${columnIndex}`;
        const isFound = foundCells.has(key);
        const isSelected = selectedCells.has(key);
        return <button key={key} type="button" data-row={rowIndex} data-column={columnIndex} className={`word-hunt-cell${isFound ? " is-found" : ""}${isSelected && !isFound ? " is-selected" : ""}`} aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}, ${letter}${isFound ? ", part of a found word" : ""}`}>{letter}</button>;
      }))}</div>
      <p className="word-hunt-status" aria-live="polite">{message}</p>
    </section>
    <aside className="word-hunt-words"><div className="word-hunt-heading"><h3>Find these words</h3><span>{foundWords.length} / {normalizedWords.length}</span></div><ul>{giftContent.wordHuntWords.map((word, index) => <li key={word} className={foundWords.includes(normalizedWords[index]) ? "is-found" : ""}>{foundWords.includes(normalizedWords[index]) ? <Check size={17} /> : <span className="word-hunt-bullet">♡</span>}<span>{word}</span></li>)}</ul><button type="button" className="word-hunt-reset" onClick={resetGame}><RotateCcw size={15} /> Start over</button></aside>
  </div></PageTransition>;
}

function BirthdayReveal({ onBack, onReplay }: { onBack: () => void; onReplay: () => void }) {
  const finalHeadline = giftContent.finalHeadline.replace("{nickname}", giftContent.recipientNickname);
  return <PageTransition className="reveal-page"><div className="reveal-stars" /><div className="confetti" aria-hidden="true">✦　♡　✧　✦　♡　✧</div><button className="reveal-back" onClick={onBack}><ArrowLeft size={16} /> Main menu</button><motion.div className="led-copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1.1, type: "spring" }}><p className="eyebrow"><Cake size={15} /> today is all about you</p><h2>{finalHeadline}</h2><div className="led-line" /><p className="final-message">{giftContent.finalMessage}</p><p className="reveal-signature">With love, {giftContent.senderName} ♡</p></motion.div><div className="reveal-actions"><button className="outline-button" onClick={onReplay}><RotateCcw size={16} /> Replay reveal</button><button className="primary-button" onClick={onBack}>Keep exploring <Heart size={16} fill="currentColor" /></button></div></PageTransition>;
}

function PhotoLightbox({ photos, index, onNavigate, onClose }: { photos: PhotoItem[]; index: number; onNavigate: (index: number) => void; onClose: () => void }) {
  const pointerStart = useRef<number | null>(null);
  const photo = photos[index];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onNavigate(Math.max(0, index - 1));
      if (event.key === "ArrowRight") onNavigate(Math.min(photos.length - 1, index + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, onNavigate, photos.length]);

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 45) {
      onNavigate(Math.max(0, Math.min(photos.length - 1, index + (distance < 0 ? 1 : -1))));
    }
  };

  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.div className="lightbox" initial={{ scale: 0.9, y: 12 }} animate={{ scale: 1, y: 0 }} onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose} aria-label="Close photo"><X /></button><div className="lightbox-image-wrap" onPointerDown={(event) => { pointerStart.current = event.clientX; }} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null; }}><AnimatePresence mode="wait" initial={false}><motion.img key={index} src={photo.image} alt={photo.alt} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.2 }} /></AnimatePresence><button className="lightbox-nav lightbox-previous" onClick={() => onNavigate(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous photo"><ArrowLeft /></button><button className="lightbox-nav lightbox-next" onClick={() => onNavigate(Math.min(photos.length - 1, index + 1))} disabled={index === photos.length - 1} aria-label="Next photo"><ArrowRight /></button></div>{photo.title && <h3 className="lightbox-title">{photo.title}</h3>}<p>{photo.caption}</p><span className="lightbox-counter">{index + 1} / {photos.length}</span></motion.div></motion.div>;
}

function FlowerModal({ flower, onClose }: { flower: FlowerItem; onClose: () => void }) {
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.div className="flower-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose} aria-label="Close flower note"><X /></button><img src={flower.image} alt={flower.name} /><div><p className="eyebrow">a note for you</p><h3>{flower.name}</h3><p>{flower.description}</p><small>{flower.note}</small></div></motion.div></motion.div>;
}

function Decorations() {
  return <div className="decorations" aria-hidden="true"><span className="float-heart heart-one">♡</span><span className="float-heart heart-two">♥</span><span className="sparkle sparkle-one">✦</span><span className="sparkle sparkle-two">✧</span></div>;
}
