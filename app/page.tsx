"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Cake, Camera, ChevronRight, Flower2, Gift, Heart, Mail, Music2, Pause, Play, RotateCcw, Sparkles, X } from "lucide-react";
import { giftContent, type FlowerItem, type PhotoItem } from "../src/data/gift-content";

type Section = "menu" | "music" | "flowers" | "pictures" | "messages" | "surprise";

const cardData = [
  { id: "music" as const, title: "Music", subtitle: "Our little soundtrack", icon: Music2, className: "card-music" },
  { id: "flowers" as const, title: "Flowers", subtitle: "A bouquet in pixels", icon: Flower2, className: "card-flowers" },
  { id: "pictures" as const, title: "Pictures", subtitle: "Favorite little moments", icon: Camera, className: "card-pictures" },
  { id: "messages" as const, title: "Messages", subtitle: "Open when you need love", icon: Mail, className: "card-messages" },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [section, setSection] = useState<Section>("menu");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedFlower, setSelectedFlower] = useState<FlowerItem | null>(null);
  const [openedLetter, setOpenedLetter] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState(0);

  const goMenu = () => { setSection("menu"); setSelectedPhoto(null); setSelectedFlower(null); setOpenedLetter(null); };

  return (
    <main className={section === "surprise" ? "app-shell surprise-shell" : "app-shell"}>
      <Decorations />
      <AnimatePresence mode="wait">
        {!started ? (
          <WelcomeScreen key="welcome" onStart={() => setStarted(true)} />
        ) : section === "menu" ? (
          <Menu key="menu" onNavigate={setSection} />
        ) : section === "music" ? (
          <MusicSection key="music" onBack={goMenu} />
        ) : section === "flowers" ? (
          <FlowersSection key="flowers" onBack={goMenu} onSelect={setSelectedFlower} />
        ) : section === "pictures" ? (
          <PicturesSection key="pictures" onBack={goMenu} onSelect={setSelectedPhoto} />
        ) : section === "messages" ? (
          <MessagesSection key="messages" onBack={goMenu} openedLetter={openedLetter} setOpenedLetter={setOpenedLetter} />
        ) : (
          <BirthdayReveal key={replayKey} onBack={goMenu} onReplay={() => setReplayKey((key) => key + 1)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedPhoto && <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
        {selectedFlower && <FlowerModal flower={selectedFlower} onClose={() => setSelectedFlower(null)} />}
      </AnimatePresence>
    </main>
  );
}

function PageTransition({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={`page ${className}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }}>{children}</motion.div>;
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return <PageTransition className="welcome-page">
    <div className="eyebrow"><Sparkles size={15} /> A birthday gift for {giftContent.recipientNickname}</div>
    <motion.div className="hero-gift" animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4 }}>
      <div className="gift-glow" /><Gift size={78} strokeWidth={1.2} /><Heart className="gift-heart" fill="currentColor" size={28} />
    </motion.div>
    <p className="script-text">for someone very special</p>
    <h1>{giftContent.welcomeGreeting}</h1>
    <p className="lead">{giftContent.intro}</p>
    <button className="primary-button" onClick={onStart}>Open Your Gift <Heart size={17} fill="currentColor" /></button>
    <p className="small-note">made with love by {giftContent.senderName}</p>
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
  const validUrl = giftContent.playlistUrl.trim();
  return <PageTransition className="content-page"><SectionHeader title={giftContent.playlistTitle} kicker="♪ your soundtrack" onBack={onBack} /><div className="music-layout"><div className="record-art"><div className="record"><div className="record-label"><Heart size={25} fill="currentColor" /></div></div><span className="record-caption">side A · memories in melody</span></div><div className="music-copy"><p className="lead">{giftContent.playlistDescription}</p>{validUrl ? <div className="embed-wrap"><iframe title="Romantic playlist" src={validUrl} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /></div> : <div className="playlist-placeholder"><Music2 size={28} /><strong>Your playlist will live here</strong><span>Paste a Spotify or YouTube embed URL in <code>src/data/gift-content.ts</code>.</span></div>}<a className="text-link" href={validUrl || "#"} onClick={(event) => !validUrl && event.preventDefault()} target="_blank" rel="noreferrer">{validUrl ? "Open playlist in a new tab →" : "Add your playlist link to enable this"}</a></div></div></PageTransition>;
}

function FlowersSection({ onBack, onSelect }: { onBack: () => void; onSelect: (flower: FlowerItem) => void }) {
  return <PageTransition className="content-page"><SectionHeader title="Flowers for your joy" kicker="✿ something blooming" onBack={onBack} /><p className="section-lead">A digital garden inspired by the real flowers waiting for you.</p><div className="flower-grid">{giftContent.flowers.map((flower) => <motion.button key={flower.name} className="flower-card" onClick={() => onSelect(flower)} whileHover={{ y: -5 }}><img src={flower.image} alt={flower.name} /><span className="flower-card-body"><strong>{flower.name}</strong><span>{flower.description}</span><small>tap to open note ·</small></span></motion.button>)}</div></PageTransition>;
}

function PicturesSection({ onBack, onSelect }: { onBack: () => void; onSelect: (photo: PhotoItem) => void }) {
  return <PageTransition className="content-page"><SectionHeader title="Little moments" kicker="♡ the scrapbook" onBack={onBack} /><p className="section-lead">Sample snapshots for now — replace them with your favorite memories whenever you&apos;re ready.</p><div className="polaroid-grid">{giftContent.photos.map((photo) => <motion.button key={photo.caption} className={`polaroid ${photo.tone}`} style={{ "--rotation": `${photo.rotation}deg` } as React.CSSProperties} onClick={() => onSelect(photo)} whileHover={{ scale: 1.04, rotate: 0, zIndex: 2 }}><span className="tape" /><img src={photo.image} alt={photo.alt} /><span className="polaroid-caption">{photo.caption}</span></motion.button>)}</div></PageTransition>;
}

function MessagesSection({ onBack, openedLetter, setOpenedLetter }: { onBack: () => void; openedLetter: number | null; setOpenedLetter: (value: number | null) => void }) {
  return <PageTransition className="content-page"><SectionHeader title="Letters for later" kicker="✉ words from the heart" onBack={onBack} /><p className="section-lead">Open one whenever you need a reminder of how loved you are.</p><div className="letter-grid">{giftContent.letters.map((letter, index) => <motion.button key={letter.title} className={`letter-card ${letter.color} ${openedLetter === index ? "is-open" : ""}`} onClick={() => setOpenedLetter(openedLetter === index ? null : index)} whileTap={{ scale: 0.98 }}><span className="letter-top"><Mail size={34} /><span className="letter-stamp">♡</span></span>{openedLetter === index ? <span className="letter-body"><strong>{letter.title}</strong><span>{letter.body}</span><small>With love, {giftContent.senderName} ♡</small><small>tap to fold away</small></span> : <span className="letter-teaser"><strong>{letter.title}</strong><span>{letter.teaser}</span><small>tap to open ·</small></span>}</motion.button>)}</div></PageTransition>;
}

function BirthdayReveal({ onBack, onReplay }: { onBack: () => void; onReplay: () => void }) {
  const finalHeadline = giftContent.finalHeadline.replace("{nickname}", giftContent.recipientNickname);
  return <PageTransition className="reveal-page"><div className="reveal-stars" /><div className="confetti" aria-hidden="true">✦　♡　✧　✦　♡　✧</div><button className="reveal-back" onClick={onBack}><ArrowLeft size={16} /> Main menu</button><motion.div className="led-copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1.1, type: "spring" }}><p className="eyebrow"><Cake size={15} /> today is all about you</p><h2>{finalHeadline}</h2><div className="led-line" /><p className="final-message">{giftContent.finalMessage}</p><p className="reveal-signature">With love, {giftContent.senderName} ♡</p></motion.div><div className="reveal-actions"><button className="outline-button" onClick={onReplay}><RotateCcw size={16} /> Replay reveal</button><button className="primary-button" onClick={onBack}>Keep exploring <Heart size={16} fill="currentColor" /></button></div></PageTransition>;
}

function PhotoLightbox({ photo, onClose }: { photo: PhotoItem; onClose: () => void }) {
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.div className="lightbox" initial={{ scale: 0.9, y: 12 }} animate={{ scale: 1, y: 0 }} onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose} aria-label="Close photo"><X /></button><img src={photo.image} alt={photo.alt} /><p>{photo.caption}</p></motion.div></motion.div>;
}

function FlowerModal({ flower, onClose }: { flower: FlowerItem; onClose: () => void }) {
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.div className="flower-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose} aria-label="Close flower note"><X /></button><img src={flower.image} alt={flower.name} /><div><p className="eyebrow">a note for you</p><h3>{flower.name}</h3><p>{flower.description}</p><small>{flower.note}</small></div></motion.div></motion.div>;
}

function Decorations() {
  return <div className="decorations" aria-hidden="true"><span className="float-heart heart-one">♡</span><span className="float-heart heart-two">♥</span><span className="sparkle sparkle-one">✦</span><span className="sparkle sparkle-two">✧</span></div>;
}
