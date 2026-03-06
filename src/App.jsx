import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Crown,
  Star,
  Flower2,
  Music2,
  Gift,
  Sparkles,
  Wand2,
  MessageCircleHeart,
  ScrollText,
  Camera,
  Lock,
  MoonStar,
  BadgeHelp,
  ChevronLeft,
  ChevronRight,
  Mail,
  PartyPopper,
  SmilePlus,
  Palette,
} from "lucide-react";

const _MOTION = motion;

const compliments = [
  "Em là người làm tim anh mềm xuống nhanh nhất.",
  "Thư luôn là điều dịu dàng nhất trong ngày của anh.",
  "Ở bên em anh luôn thấy bình yên hơn hẳn.",
  "Thư vừa đáng yêu vừa tốt bụng theo cách rất riêng.",
  "Anh thật sự rất may mắn khi có em.",
  "Nếu phải chọn lại, anh vẫn sẽ chọn gặp Thư.",
  "Em là ngoại lệ ngọt ngào nhất của anh.",
  "Anh vẫn thấy Thư là người dễ thương nhất trên đời.",
  "Kể cả lúc em giận, em vẫn là người anh thương nhất.",
];

const loveNotes = [
  "Anh xin lỗi vì đã làm em buồn.",
  "Anh đang cố gắng để tốt hơn mỗi ngày.",
  "Anh không muốn mất em.",
  "Anh thật sự rất trân trọng em.",
  "Em quan trọng với anh nhiều hơn em nghĩ.",
  "Anh vẫn thương em rất nhiều.",
  "Điều anh muốn giữ nhất luôn là tụi mình.",
  "Anh biết em xứng đáng với sự dịu dàng nhiều hơn nữa.",
  "Anh nhớ em nhiều hơn anh thể hiện.",
  "Anh muốn làm em yên lòng hơn, chứ không chỉ xin lỗi cho xong.",
];

const reasons100 = [
  "Vì em cười lên là anh mềm lòng ngay.",
  "Vì Thư khiến ngày bình thường cũng hóa đặc biệt.",
  "Vì em vừa đáng yêu vừa mạnh mẽ.",
  "Vì Thư cho anh cảm giác muốn trở nên tốt hơn.",
  "Vì em là người anh nhớ đầu tiên khi vui lẫn buồn.",
  "Vì Thư làm anh thấy bình yên.",
  "Vì em có cách quan tâm rất riêng.",
  "Vì Thư là người anh không muốn đánh mất.",
  "Vì em rất xinh theo cách của riêng em.",
  "Vì Thư là Thư. Thế là đủ.",
  "Vì kể cả lúc em giận, em vẫn là người anh thương nhất.",
  "Vì anh muốn học cách yêu Thư tử tế hơn.",
  "Vì ở cạnh em, anh thấy mình thuộc về đúng chỗ.",
  "Vì Thư làm những điều nhỏ xíu cũng thành đáng nhớ.",
  "Vì anh muốn đi qua thật nhiều mùa cùng em.",
];

const promises = [
  "Lắng nghe em kỹ hơn trước khi phản ứng.",
  "Bớt cái tôi để không làm em mệt.",
  "Nói chuyện dịu dàng hơn khi cả hai đang căng thẳng.",
  "Quan tâm em bằng hành động, không chỉ lời nói.",
  "Không để em phải thấy cô đơn trong chính mối quan hệ này.",
  "Chủ động làm lành, chủ động sửa sai.",
  "Nhớ những điều nhỏ nhỏ mà em thích.",
  "Không để một cuộc cãi nhau lớn hơn tình cảm của tụi mình.",
];

const memories = [
  {
    title: "22/02/2025",
    text: "Ngày bắt đầu của tụi mình. Một ngày mà với anh, mọi thứ từ đó trở nên khác đi theo cách đẹp nhất.",
    icon: "💌",
    bg: "from-pink-100 to-rose-100",
  },
  {
    title: "Một lần cún cười",
    text: "Có những lúc chỉ cần nhìn Thư cười thôi là nguyên ngày của anh tự nhiên nhẹ xuống.",
    icon: "🌷",
    bg: "from-rose-100 to-fuchsia-100",
  },
  {
    title: "Lúc anh nhớ cún",
    text: "Có những lúc chẳng có lý do gì đặc biệt, anh chỉ đơn giản là nhớ Thư thôi.",
    icon: "💭",
    bg: "from-violet-100 to-pink-100",
  },
  {
    title: "Điều anh muốn giữ",
    text: "Không phải thắng thua trong một cuộc cãi nhau, mà là tụi mình và những ngày bình yên bên nhau.",
    icon: "💞",
    bg: "from-pink-100 to-amber-50",
  },
];

const popupMessages = [
  "Anh nhớ em quá đó 💗",
  "Thư đừng giận lâu quá nha ✨",
  "Cho anh thêm một cơ hội dịu dàng hơn nha 🌷",
  "Một cái ôm online gửi em nè 🤍",
  "Nếu Thư cười rồi thì anh vui lắm luôn 🥹",
];

const photoCards = [
  {
    title: "Em và anh dưới trời sao",
    subtitle: "Một tấm ảnh anh cực thích",
    emoji: "",
    img: "/images/photo1.jpg",
    note: "Anh thích cảm giác trong bức ảnh này, như thể chỉ cần đứng cạnh Thư thôi là mọi thứ đã đủ đẹp rồi.",
  },
  {
    title: "Một buổi đi chơi rất xinh",
    subtitle: "Khoảnh khắc tụi mình nắm tay",
    emoji: "",
    img: "/images/photo2.jpg",
    note: "Anh luôn muốn có thêm thật nhiều buổi đi chơi như thế này với em.",
  },
  {
    title: "Selfie của hai đứa",
    subtitle: "Ngố nhưng đáng yêu",
    emoji: "",
    img: "/images/photo3.jpg",
    note: "Những khoảnh khắc đơn giản như vậy lại là những khoảnh khắc làm anh nhớ nhất.",
  },
  {
    title: "Một buổi tối ấm áp",
    subtitle: "Chỉ cần nhìn nhau cười",
    emoji: "",
    img: "/images/photo4.jpg",
    note: "Anh thích cách tụi mình nhìn nhau trong bức này, rất nhẹ nhưng rất thật.",
  },
  {
    title: "Hai đứa ngố của anh",
    subtitle: "Khoảnh khắc siêu cưng",
    emoji: "",
    img: "/images/photo5.jpg",
    note: "Đây là kiểu ảnh làm anh bật cười mỗi lần xem lại, vì em lúc nào cũng đáng yêu hết.",
  },
  {
    title: "Ngày thật đẹp của tụi mình",
    subtitle: "Một kỷ niệm anh trân trọng",
    emoji: "",
    img: "/images/photo6.jpg",
    note: "Anh mong tụi mình sẽ còn có thêm thật nhiều ngày đẹp như thế này nữa.",
  },
];

function TypingText({ text, speed = 30, className = "", showCursor = true }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));
      if (index >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <p className={`whitespace-pre-line ${className}`}>
      {displayText}
      {showCursor && (
        <motion.span
          className="ml-1 inline-block text-pink-400"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </p>
  );
}

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.4;
  }, []);

  useEffect(() => {
    const startOnFirstInteraction = async () => {
      if (startedRef.current || !audioRef.current) return;
      startedRef.current = true;
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    window.addEventListener("pointerdown", startOnFirstInteraction, {
      once: true,
    });
    window.addEventListener("keydown", startOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/love.mp3" preload="auto" />
      <motion.button
        onClick={toggleMusic}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: playing
            ? [
                "0 0 0px rgba(236,72,153,0.15)",
                "0 0 24px rgba(236,72,153,0.55)",
                "0 0 0px rgba(236,72,153,0.15)",
              ]
            : "0 8px 22px rgba(15,23,42,0.15)",
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed left-4 md:left-6 bottom-24 md:bottom-6 z-50 h-12 w-12 rounded-full border border-pink-100 bg-white/90 backdrop-blur-md text-pink-500 flex items-center justify-center"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <Music2 className={`h-5 w-5 ${playing ? "animate-pulse" : ""}`} />
      </motion.button>
    </>
  );
}

function ClickHeartEffect() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const spawnHeart = (event) => {
      const heart = {
        id: `${Date.now()}-${Math.random()}`,
        x: event.clientX,
        y: event.clientY,
        drift: (Math.random() - 0.5) * 80,
        size: 18 + Math.random() * 14,
      };

      setHearts((prev) => [...prev.slice(-32), heart]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((item) => item.id !== heart.id));
      }, 1100);
    };

    window.addEventListener("pointerdown", spawnHeart);
    return () => window.removeEventListener("pointerdown", spawnHeart);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="absolute select-none"
            style={{ left: heart.x, top: heart.y, fontSize: heart.size }}
            initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -90, x: heart.drift, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            💗
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

function HeartRain() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: (i * 17) % 100,
        size: 12 + (i % 5) * 4,
        delay: i * 0.35,
        duration: 9 + (i % 6),
        drift: ((i % 7) - 3) * 8,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-pink-300/60"
          style={{ left: `${heart.left}%`, top: "-12vh", fontSize: heart.size }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, heart.drift, -heart.drift * 0.5],
            opacity: [0, 0.4, 0.2, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          💕
        </motion.span>
      ))}
    </div>
  );
}

function DreamyBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(244,114,182,0.26),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.2),transparent_35%),linear-gradient(180deg,rgba(255,244,250,0.8)_0%,rgba(252,242,255,0.55)_45%,rgba(255,247,251,0.8)_100%)]" />
      <motion.div
        className="absolute -top-20 left-[6%] h-72 w-72 rounded-full bg-pink-300/25 blur-3xl"
        animate={{ x: [0, 30, -10, 0], y: [0, 20, -12, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[22%] right-[8%] h-80 w-80 rounded-full bg-violet-300/20 blur-3xl"
        animate={{ x: [0, -24, 10, 0], y: [0, -14, 16, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[30%] h-72 w-72 rounded-full bg-rose-300/20 blur-3xl"
        animate={{ x: [0, 20, -16, 0], y: [0, -18, 8, 0], scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
    </div>
  );
}

function FloatingDecor() {
  const items = useMemo(() => Array.from({ length: 40 }, (_, i) => i), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_24%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(192,132,252,0.14),transparent_22%)]" />

      {items.map((i) => {
        const emojis = ["💖", "✨", "🌸", "🫧", "💗", "🎀"];
        return (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            initial={{ y: 720, opacity: 0, x: 0, rotate: 0 }}
            animate={{
              y: -220,
              opacity: [0, 1, 1, 0],
              x: [0, 14, -12, 8, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 11 + (i % 6),
              repeat: Infinity,
              delay: i * 0.24,
              ease: "linear",
            }}
            style={{
              left: `${3 + ((i * 2.7) % 94)}%`,
              fontSize: 14 + (i % 5) * 8,
            }}
          >
            {emojis[i % emojis.length]}
          </motion.div>
        );
      })}

      <motion.div
        className="absolute left-[6%] top-[12%] w-48 h-48 bg-pink-200/30 blur-3xl rounded-full"
        animate={{ scale: [1, 1.22, 1], x: [0, 12, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[8%] top-[18%] w-56 h-56 bg-purple-200/25 blur-3xl rounded-full"
        animate={{ scale: [1.05, 1.28, 1], x: [0, -14, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-[28%] bottom-[8%] w-52 h-52 bg-rose-200/25 blur-3xl rounded-full"
        animate={{ scale: [0.95, 1.12, 0.95], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const next = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1.5 w-full bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-violet-400 shadow-[0_0_24px_rgba(236,72,153,0.65)]"
        animate={{ width: `${progress}%` }}
      />
    </div>
  );
}

function StarHeroBackground() {
  const stars = useMemo(() => Array.from({ length: 36 }, (_, i) => i), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_24%),linear-gradient(180deg,rgba(36,10,58,0.92)_0%,rgba(58,18,88,0.78)_40%,rgba(255,240,248,0)_100%)]" />
      {stars.map((i) => (
        <motion.div
          key={i}
          className="absolute text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{
            left: `${(i * 11) % 100}%`,
            top: `${6 + ((i * 7) % 42)}%`,
            fontSize: `${12 + (i % 3) * 10}px`,
          }}
          animate={{
            opacity: [0.45, 1, 0.45],
            scale: [1, 1.12, 1],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 2.8 + (i % 4),
            repeat: Infinity,
            delay: i * 0.1,
          }}
        >
          ✦
        </motion.div>
      ))}
      <motion.div
        className="absolute left-1/2 top-[18%] h-52 w-52 -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}

function CursorTrail() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const move = (e) => {
      const point = {
        id: `${Date.now()}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        emoji: ["💗", "✨", "🌸", "🎀"][Math.floor(Math.random() * 4)],
      };
      setPoints((prev) => [...prev.slice(-12), point]);
      setTimeout(() => {
        setPoints((prev) => prev.filter((p) => p.id !== point.id));
      }, 700);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      <AnimatePresence>
        {points.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.9, scale: 0.8, y: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute"
            style={{ left: point.x, top: point.y }}
          >
            <span className="text-lg">{point.emoji}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function EnterOverlay() {
  const [entered, setEntered] = useState(false);

  if (entered) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[radial-gradient(circle_at_top,#fff6fb_0%,#fdf1ff_42%,#ffeef5_100%)] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-2xl w-full rounded-[2.5rem] bg-white/88 border border-pink-100 shadow-[0_30px_100px_rgba(236,72,153,0.18)] p-8 md:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-violet-200/30 blur-3xl" />
        <motion.div
          animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative inline-flex mb-5 h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-violet-100 text-pink-500 shadow-lg"
        >
          <Crown className="h-10 w-10" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
          Tap to enter our little world
        </h1>
        <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
          Một góc nhỏ anh làm riêng cho em. Ở đây có lời xin lỗi, lời thương,
          hiệu ứng dễ thương, và rất nhiều chi tiết chỉ để dỗ em dịu lại một
          chút.
        </p>
        <button
          onClick={() => setEntered(true)}
          className="mt-8 rounded-full px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold shadow-xl hover:scale-105 transition"
        >
          Vào xem anh đã chuẩn bị gì nè 💖
        </button>
      </motion.div>
    </div>
  );
}

function PrincessCompliment() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % compliments.length),
      2400,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/85 px-5 py-3 shadow-lg text-pink-600 font-semibold"
      >
        <Sparkles className="h-4 w-4" />
        {compliments[index]}
      </motion.div>
    </AnimatePresence>
  );
}

function PrincessMusicCard() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setProgress((p) => (p >= 100 ? 0 : p + 1)),
      120,
    );
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center text-pink-500 shadow-sm">
          <Music2 className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl">Nhạc nền công chúa</h3>
          <p className="text-gray-500 mt-1">
            Một góc nhỏ dịu dàng để em chill một chút rồi hãy giận tiếp cũng
            được.
          </p>
          <div className="mt-4 h-2 rounded-full bg-pink-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 to-violet-400"
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <button
              onClick={() => setPlaying((v) => !v)}
              className="rounded-full px-5 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold shadow-lg hover:scale-105 transition"
            >
              {playing ? "Tạm dừng dịu dàng" : "Bật nhạc cho công chúa"}
            </button>
            <button
              onClick={() => setProgress(0)}
              className="rounded-full px-5 py-3 bg-white border border-pink-100 font-semibold hover:-translate-y-0.5 transition"
            >
              Phát lại từ đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReasonMachine() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState("sweet");

  const playfulReasons = [
    "Vì em giận cũng đáng yêu nữa.",
    "Vì mỗi lần em rep anh là tim anh nhảy một cái.",
    "Vì em là người duy nhất làm anh vừa sợ vừa muốn dỗ tới cùng.",
    "Vì Thư có cái kiểu khiến anh muốn nhường hết cho em.",
    "Vì em là người anh muốn khoe và cũng là người anh muốn giữ riêng.",
  ];

  const currentList = mode === "sweet" ? reasons100 : playfulReasons;

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-rose-500 shadow-sm">
          <Wand2 className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold">Máy tạo lý do anh thương em</h3>
              <p className="text-gray-500 mt-1">
                Bấm bao nhiêu lần cũng được. Anh không thiếu lý do để thương em.
              </p>
            </div>
            <div className="flex rounded-full bg-pink-50 p-1 border border-pink-100">
              <button
                onClick={() => setMode("sweet")}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${mode === "sweet" ? "bg-white shadow text-pink-500" : "text-pink-400"}`}
              >
                Ngọt
              </button>
              <button
                onClick={() => setMode("playful")}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${mode === "playful" ? "bg-white shadow text-pink-500" : "text-pink-400"}`}
              >
                Nhây
              </button>
            </div>
          </div>
          <div className="mt-4 rounded-[1.5rem] bg-gradient-to-br from-pink-50 to-violet-50 border border-pink-100 p-5 min-h-[120px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${mode}-${count}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg font-semibold text-pink-600"
              >
                {currentList[count % currentList.length]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="rounded-full px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-lg hover:scale-105 transition"
            >
              Xem thêm 1 lý do nữa 💗
            </button>
            <button
              onClick={() => setCount((c) => c + 3)}
              className="rounded-full px-5 py-3 bg-white border border-pink-100 font-semibold hover:-translate-y-0.5 transition"
            >
              Random nhây nhây ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DayCounter() {
  const [days] = useState(() => {
    const start = new Date("2025-02-22");
    const today = new Date();
    return Math.floor((today - start) / (1000 * 60 * 60 * 24));
  });

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-pink-500 shadow-sm">
          <Heart className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Bộ đếm ngày thương em</h3>
          <p className="text-gray-500 mt-1">
            Từ ngày 22/02/2025 tới giờ, anh vẫn luôn thấy cún là người anh muốn
            thương lâu thật lâu.
          </p>
          <div className="mt-4 inline-flex items-end gap-3 rounded-[1.5rem] bg-gradient-to-br from-pink-50 to-violet-50 border border-pink-100 px-6 py-5">
            <span className="text-5xl font-black text-pink-500">{days}</span>
            <span className="text-lg font-semibold text-gray-600 mb-1">
              ngày anh dành thương cho em
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoveTimeline() {
  const items = [
    {
      date: "22/02/2025",
      title: "Ngày tụi mình bắt đầu",
      text: "Ngày mà anh có thêm một người để thương bằng tất cả sự chân thành.",
    },
    {
      date: "Những buổi đi chơi",
      title: "Những lần đi cùng nhau",
      text: "Mỗi lần đi đâu với Thư, anh đều thấy ngày hôm đó dễ thương hơn bình thường.",
    },
    {
      date: "Những tấm ảnh này",
      title: "Ký ức anh muốn giữ",
      text: "Có những khoảnh khắc nhìn lại thôi cũng đủ làm anh mềm lòng vì em.",
    },
    {
      date: "Ngay bây giờ",
      title: "Điều anh vẫn muốn",
      text: "Anh vẫn muốn nắm tay Thư thật lâu và sửa mọi thứ theo cách tử tế hơn.",
    },
  ];

  return (
    <div className="rounded-[1.75rem] md:rounded-[2rem] bg-white/82 border border-pink-100 p-5 md:p-7 shadow-xl">
      <div className="flex items-start gap-3 md:gap-4 mb-5">
        <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center text-pink-500 shadow-sm shrink-0">
          <PartyPopper className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold">
            Timeline của em và anh
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Một dòng thời gian nhỏ cho những điều anh rất trân trọng.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            className="grid grid-cols-[auto_1fr] gap-4 items-start"
          >
            <div className="flex flex-col items-center pt-1">
              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 shadow-[0_0_18px_rgba(236,72,153,0.5)]" />
              {idx !== items.length - 1 && (
                <div className="mt-2 h-full min-h-[64px] w-[2px] bg-gradient-to-b from-pink-200 to-violet-200" />
              )}
            </div>
            <div className="rounded-[1.25rem] border border-pink-100 bg-gradient-to-br from-white to-pink-50 p-4 md:p-5">
              <div className="text-xs md:text-sm font-semibold text-pink-500 mb-1">
                {item.date}
              </div>
              <div className="text-base md:text-lg font-bold mb-1">
                {item.title}
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PromiseList() {
  const [checked, setChecked] = useState([]);
  const toggle = (idx) => {
    setChecked((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center text-violet-500 shadow-sm">
          <ScrollText className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">Danh sách điều anh hứa sẽ sửa</h3>
          <p className="text-gray-500 mt-1">
            Không phải cho đẹp. Mà là những điều anh thật sự muốn làm tốt hơn.
          </p>
          <div className="mt-4 space-y-3">
            {promises.map((item, idx) => {
              const active = checked.includes(idx);
              return (
                <button
                  key={item}
                  onClick={() => toggle(idx)}
                  className={`w-full rounded-2xl p-4 border text-left transition ${
                    active
                      ? "bg-pink-50 border-pink-200"
                      : "bg-white border-pink-100 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-6 w-6 rounded-full border-2 ${active ? "bg-pink-500 border-pink-500" : "border-pink-300"}`}
                    />
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function LockedHeart() {
  const [code, setCode] = useState("");
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [tries, setTries] = useState(0);

  const hints = [
    "Gợi ý: thử một câu mà anh nên nói nhiều hơn.",
    "Hint nhỏ: 3 chữ thôi, bắt đầu bằng 'anh'.",
    "Gần đúng rồi đó, thử dịu hơn một chút nha ✨",
  ];

  const handleUnlock = () => {
    const safe = code.trim().toLowerCase();
    if (
      safe === "anh xin loi" ||
      safe === "anh thương em" ||
      safe === "anh thuong em"
    ) {
      setOpened(true);
      setMessage("");
    } else {
      const next = tries + 1;
      setTries(next);
      setMessage(hints[Math.min(next - 1, hints.length - 1)]);
    }
  };

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-100 to-violet-100 flex items-center justify-center text-rose-500 shadow-sm">
          <Lock className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">Khoá trái tim bí mật</h3>
          <p className="text-gray-500 mt-1">
            Nhập một câu ngọt ngọt để mở hộp bí mật nha.
          </p>
          {!opened ? (
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ví dụ: anh xin loi"
                className="flex-1 rounded-full border border-pink-100 bg-white px-5 py-3 outline-none focus:border-pink-300"
              />
              <button
                onClick={handleUnlock}
                className="rounded-full px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold shadow-lg"
              >
                Mở khoá
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 rounded-[1.5rem] bg-gradient-to-br from-pink-50 to-violet-50 border border-pink-100 p-5"
            >
              <p className="text-lg text-pink-600 font-semibold">
                Bí mật mở ra rồi nè: Dù có chuyện gì, người anh muốn giữ vẫn
                luôn là em. 💗
              </p>
            </motion.div>
          )}
          {message && <p className="mt-3 text-sm text-pink-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}

function MemoryGallery() {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4 mb-5">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-yellow-100 to-pink-100 flex items-center justify-center text-yellow-500 shadow-sm">
          <Camera className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Phòng trưng bày ký ức</h3>
          <p className="text-gray-500 mt-1">
            Bạn có thể thay bằng ảnh thật của hai người sau. Tạm thời anh để một
            gallery siêu cưng trước.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-5">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-[2rem] min-h-[320px] border border-pink-100 bg-gradient-to-br ${memories[active].bg} p-7 flex flex-col justify-between relative overflow-hidden`}
        >
          <div className="absolute right-0 top-0 h-36 w-36 bg-pink-200/30 rounded-full blur-3xl" />
          <div>
            <div className="text-5xl mb-4">{memories[active].icon}</div>
            <h4 className="text-2xl font-bold mb-3">
              {memories[active].title}
            </h4>
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
              {memories[active].text}
            </p>
          </div>
          <div className="text-sm text-pink-500 font-semibold">
            Một góc nhỏ anh muốn giữ mãi ✨
          </div>
        </motion.div>

        <div className="space-y-3">
          {memories.map((item, idx) => (
            <button
              key={item.title}
              onClick={() => setActive(idx)}
              className={`w-full rounded-[1.5rem] p-4 border text-left transition ${
                active === idx
                  ? "bg-pink-50 border-pink-200 shadow-sm"
                  : "bg-white border-pink-100 hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <div className="font-bold">{item.title}</div>
                  <div className="text-sm text-gray-500">Bấm để xem</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + photoCards.length) % photoCards.length);
  };
  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % photoCards.length);
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 90 : -90, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -90 : 90, scale: 0.98 }),
  };

  return (
    <div className="rounded-[1.75rem] md:rounded-[2rem] bg-white/80 border border-pink-100 p-4 md:p-6 shadow-lg">
      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
        <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center text-pink-500 shadow-sm shrink-0">
          <Camera className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold">
            Carousel ảnh của cún và anh
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Vuốt nhẹ hoặc bấm xem từng ảnh của tụi mình nha.
          </p>
        </div>
      </div>

      <div className="relative rounded-[1.75rem] overflow-hidden border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-violet-50 p-3 md:p-6 min-h-[420px] md:min-h-[290px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) next();
              if (info.offset.x > 100) prev();
            }}
            className="grid md:grid-cols-[0.95fr_1.05fr] gap-4 md:gap-5 items-center"
          >
            <div className="rounded-[1.5rem] overflow-hidden border border-pink-100 shadow-inner bg-white aspect-[4/5] md:aspect-auto md:h-[260px]">
              <img
                src={photoCards[index].img}
                alt={photoCards[index].title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="px-1 md:px-0">
              <div className="inline-flex rounded-full bg-white border border-pink-100 px-3 py-1 text-[11px] md:text-xs font-semibold text-pink-500 mb-3 md:mb-4">
                {photoCards[index].subtitle}
              </div>
              <h4 className="text-2xl md:text-3xl font-black mb-2 md:mb-3">
                {photoCards[index].title}
              </h4>
              <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                {photoCards[index].note}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 md:mt-5 flex items-center justify-between gap-3">
          <div className="flex gap-2 flex-wrap">
            {photoCards.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2.5 rounded-full transition ${index === i ? "w-8 bg-pink-400" : "w-2.5 bg-pink-200"}`}
              />
            ))}
          </div>
          <div className="flex gap-2 md:gap-3 shrink-0">
            <button
              onClick={prev}
              className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-pink-100 bg-white flex items-center justify-center shadow-sm hover:-translate-y-0.5 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-pink-100 bg-white flex items-center justify-center shadow-sm hover:-translate-y-0.5 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TinyFAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    {
      q: "Anh làm cái này để làm gì?",
      a: "Để em thấy rằng anh không chỉ xin lỗi bằng mồm. Anh muốn dành thời gian thật sự cho em.",
    },
    {
      q: "Vì sao lại màu công chúa thế này?",
      a: "Vì anh muốn mọi thứ nhìn mềm, dễ thương và đúng vibe em là công chúa.",
    },
    {
      q: "Nếu em còn giận thì sao?",
      a: "Thì anh vẫn tôn trọng cảm xúc của em. Trang này chỉ để dỗ em dịu xuống một chút thôi.",
    },
  ];

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4 mb-5">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-pink-500 shadow-sm">
          <BadgeHelp className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Hỏi nhanh đáp dịu</h3>
          <p className="text-gray-500 mt-1">
            Một góc hơi nhây, nhưng vẫn tử tế.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <div
            key={item.q}
            className="rounded-[1.5rem] border border-pink-100 bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === idx ? -1 : idx)}
              className="w-full px-5 py-4 text-left font-semibold flex items-center justify-between"
            >
              <span>{item.q}</span>
              <span className="text-pink-400">{open === idx ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {open === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-4 text-gray-600 leading-relaxed"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoveNoteWall() {
  const [opened, setOpened] = useState([]);

  const toggle = (i) => {
    if (opened.includes(i)) return;
    setOpened([...opened, i]);
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
      {loveNotes.map((note, i) => {
        const isOpen = opened.includes(i);
        return (
          <motion.div
            key={i}
            whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
            onClick={() => toggle(i)}
            className="cursor-pointer rounded-[1.75rem] bg-white/85 border border-pink-100 p-5 shadow-lg min-h-[156px]"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="h-10 w-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-400">
                <Gift className="h-5 w-5" />
              </div>
              <span className="text-xs text-gray-400">#{i + 1}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {isOpen ? note : "Bấm để mở lời nhắn bí mật của anh ✨"}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

function EnvelopeLetter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[1.75rem] md:rounded-[2rem] bg-white/85 border border-pink-100 p-4 md:p-6 shadow-xl overflow-hidden">
      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
        <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-pink-500 shadow-sm shrink-0">
          <Mail className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold">
            Phong thư riêng cho Thư
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Bấm mở phong thư để xem lời anh viết riêng cho cún.
          </p>
        </div>
      </div>

      <div className="relative min-h-[240px] md:min-h-[280px] rounded-[1.75rem] md:rounded-[2rem] bg-gradient-to-br from-pink-50 via-white to-violet-50 border border-pink-100 p-4 md:p-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="closed"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={() => setOpen(true)}
              className="relative h-44 md:h-48 w-full max-w-md"
            >
              <div className="absolute inset-0 rounded-[1.6rem] md:rounded-[1.8rem] bg-white shadow-xl border border-pink-100" />
              <div className="absolute inset-x-0 top-0 mx-auto h-20 md:h-24 w-full max-w-md overflow-hidden rounded-t-[1.6rem] md:rounded-t-[1.8rem]">
                <div className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-br from-pink-300 to-rose-300 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-pink-500 px-4">
                <Mail className="h-8 w-8 md:h-9 md:w-9" />
                <span className="font-bold text-sm md:text-base">
                  Mở thư của anh ra nha 💌
                </span>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl rounded-[1.6rem] md:rounded-[1.8rem] bg-white border border-pink-100 shadow-xl p-5 md:p-8"
            >
              <h4 className="text-xl md:text-2xl font-black mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                Gửi cún của anh
              </h4>
              <div className="space-y-3 md:space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  Anh biết có những lúc anh làm cún buồn và khiến cún phải giữ
                  trong lòng nhiều cảm xúc nặng nề.
                </p>
                <p>
                  Anh xin lỗi vì sự vụng về của mình. Xin lỗi vì có lúc anh chưa
                  hiểu Thư đủ, chưa dịu dàng đủ, chưa làm cún yên lòng đủ.
                </p>
                <p>
                  Nhưng có một điều anh rất chắc: người anh muốn giữ vẫn là Thư.
                  Người anh muốn học cách yêu tốt hơn cũng là cún.
                </p>
                <p className="font-semibold text-pink-500">
                  Nếu cún chưa hết giận cũng không sao. Anh vẫn ở đây, tử tế hơn
                  một chút mỗi ngày, để chứng minh cho Thư thấy.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="mt-5 md:mt-6 rounded-full px-5 py-3 bg-slate-900 text-white font-semibold"
              >
                Đóng thư lại
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StickerPainter() {
  const [stickers, setStickers] = useState([]);
  const boardRef = useRef(null);

  const placeSticker = (e) => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const emoji = ["💖", "🌷", "✨", "🎀", "💗", "😚"][
      Math.floor(Math.random() * 6)
    ];
    setStickers((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, x, y, emoji },
    ]);
  };

  const scatterChaos = () => {
    const chaos = Array.from({ length: 16 }, (_, i) => ({
      id: `chaos-${Date.now()}-${i}`,
      x: 20 + ((i * 37) % 260),
      y: 20 + ((i * 53) % 180),
      emoji: ["💖", "✨", "🌷", "🎀", "💗"][i % 5],
    }));
    setStickers((prev) => [...prev, ...chaos]);
  };

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4 mb-5">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 flex items-center justify-center text-pink-500 shadow-sm">
          <Palette className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Bảng dán sticker cho em</h3>
          <p className="text-gray-500 mt-1">
            Bấm vào bảng để dán tim, hoa, nơ lung linh.
          </p>
        </div>
      </div>

      <div
        ref={boardRef}
        onClick={placeSticker}
        className="relative min-h-[260px] rounded-[2rem] border border-pink-100 bg-[linear-gradient(135deg,#fff6fb_0%,#fffdfd_50%,#f8f3ff_100%)] overflow-hidden cursor-crosshair"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,192,203,0.22),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(196,181,253,0.22),transparent_25%)]" />
        {stickers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-center px-6 text-gray-500">
            Chạm vào đây để dán một đống sticker dễ thương lên tấm bảng này nha
            ✨
          </div>
        )}
        <AnimatePresence>
          {stickers.map((sticker) => (
            <motion.div
              key={sticker.id}
              initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, -8, 8, 0] }}
              exit={{ opacity: 0 }}
              className="absolute text-2xl"
              style={{ left: sticker.x - 12, top: sticker.y - 12 }}
            >
              {sticker.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => setStickers([])}
          className="rounded-full px-5 py-3 bg-white border border-pink-100 font-semibold hover:-translate-y-0.5 transition"
        >
          Xoá sticker để dán lại
        </button>
        <button
          onClick={scatterChaos}
          className="rounded-full px-5 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Dán loạn lên giúp anh 😚
        </button>
      </div>
    </div>
  );
}

function MoodMeter() {
  const [level, setLevel] = useState(65);
  const status =
    level > 75
      ? "Hơi giận nhẹ thôi"
      : level > 45
        ? "Đang cân nhắc tha thứ"
        : "Trái tim mềm rồi đó";

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center text-pink-500 shadow-sm">
          <Heart className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">Thanh đo độ giận của em</h3>
          <p className="text-gray-500 mt-1">
            Kéo thử đi, biết đâu càng kéo càng đỡ giận anh hơn.
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="mt-5 w-full accent-pink-500"
          />
          <div className="mt-4 rounded-[1.5rem] border border-pink-100 bg-gradient-to-br from-pink-50 to-violet-50 p-4">
            <p className="font-semibold text-pink-600">{status}</p>
            <p className="text-sm text-gray-600 mt-1">
              Mức hiện tại: {level}% giận. Anh xin được kéo xuống 0% bằng sự
              chân thành 🥹
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeaseButtons() {
  const [text, setText] = useState("Bấm thử đi");
  const [count, setCount] = useState(0);
  const lines = [
    "Bấm thử đi",
    "Em bấm nữa đi mà",
    "Anh thấy em đang mềm lòng rồi đó",
    "Thêm một cái nữa là anh vui lắm luôn",
    "Oke em thắng, nhưng bấm tiếp nha",
  ];

  return (
    <div className="rounded-[2rem] bg-white/80 border border-pink-100 p-6 shadow-lg text-center">
      <h3 className="text-xl font-bold">Nút nhây nhây của anh</h3>
      <p className="text-gray-500 mt-1">
        Không có tác dụng gì lớn ngoài việc dỗ em và làm em bận một chút.
      </p>
      <button
        onClick={() => {
          const next = count + 1;
          setCount(next);
          setText(lines[next % lines.length]);
        }}
        className="mt-5 rounded-full px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold shadow-xl hover:scale-105 transition"
      >
        {text}
      </button>
      <p className="mt-4 text-sm text-pink-500 font-semibold">
        Em đã chiều anh bấm {count} lần rồi đó 💗
      </p>
    </div>
  );
}

function PopupLove() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        popupMessages[Math.floor(Math.random() * popupMessages.length)];
      setMessage({ id: `${Date.now()}`, text: random });
      setTimeout(() => setMessage(null), 2400);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 max-w-[300px] md:max-w-sm rounded-[1.5rem] bg-white/95 border border-pink-100 px-4 md:px-5 py-4 shadow-[0_18px_60px_rgba(236,72,153,0.2)]"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
              <SmilePlus className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-pink-500">Tin nhắn từ anh</p>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                {message.text}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FireworkBurst({ show = false }) {
  if (!show) return null;
  const pieces = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((i) => {
        const angle = (i / pieces.length) * Math.PI * 2;
        const x = Math.cos(angle) * (80 + (i % 4) * 18);
        const y = Math.sin(angle) * (80 + (i % 4) * 18);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, x, y, scale: 1.4 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 text-xl"
          >
            {i % 3 === 0 ? "💖" : i % 3 === 1 ? "✨" : "🌸"}
          </motion.div>
        );
      })}
    </div>
  );
}

function NightModeBlessing() {
  const [night, setNight] = useState(false);
  return (
    <div
      className={`rounded-[2rem] border p-6 shadow-lg transition ${night ? "bg-slate-900 border-slate-800 text-white" : "bg-white/80 border-pink-100 text-gray-800"}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm ${night ? "bg-white/10 text-yellow-300" : "bg-gradient-to-br from-indigo-100 to-pink-100 text-indigo-500"}`}
        >
          <MoonStar className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">Chế độ chúc ngủ ngon cho em</h3>
          <p className={`mt-1 ${night ? "text-white/70" : "text-gray-500"}`}>
            Bật lên để xem một phiên bản đêm nhẹ nhàng hơn.
          </p>
          <button
            onClick={() => setNight((v) => !v)}
            className={`mt-4 rounded-full px-5 py-3 font-bold ${night ? "bg-white text-slate-900" : "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"}`}
          >
            {night ? "Tắt chế độ đêm" : "Bật chúc ngủ ngon"}
          </button>
          <AnimatePresence>
            {night && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-5 rounded-[1.5rem] bg-white/10 border border-white/10 p-5"
              >
                <p className="text-lg leading-relaxed">
                  Chúc em ngủ ngon. Dù hôm nay có buồn một chút, anh vẫn mong
                  giấc ngủ của em thật yên và trái tim em được nhẹ lại. 🌙✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ChoiceMoment() {
  const [yesHovered, setYesHovered] = useState(false);
  const [mood, setMood] = useState(null);
  const [noText, setNoText] = useState("Em vẫn còn giận nè");
  const [celebrate, setCelebrate] = useState(false);

  const playfulNoTexts = [
    "Em vẫn còn giận nè",
    "Cho anh xin thêm cơ hội suy nghĩ lại đi mà",
    "Nút này chỉ để Thư nhây với anh thôi đúng không",
    "Thôi bấm nút bên kia thử đi em ơi",
    "Anh tôn trọng Thư, nhưng cho anh cửa làm lành nha",
  ];

  const handleSoft = () => {
    setMood("soft");
    setCelebrate(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      scalar: 0.95,
      startVelocity: 38,
    });
    setTimeout(() => {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        scalar: 0.7,
      });
    }, 220);
    setTimeout(() => setCelebrate(false), 1200);
  };

  return (
    <div className="text-center rounded-[1.75rem] md:rounded-[2rem] bg-white/85 border border-pink-100 p-5 md:p-10 shadow-xl relative overflow-hidden">
      <FireworkBurst show={celebrate} />
      <div className="absolute -right-8 -top-8 h-28 w-28 bg-pink-200/30 blur-2xl rounded-full" />
      <div className="text-5xl md:text-6xl mb-4">🥺💗</div>
      <h3 className="text-2xl md:text-3xl font-black mb-3 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
        Vậy giờ cho anh một câu trả lời dịu dàng nha?
      </h3>
      <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-7 px-1">
        Anh không thể ép em phải chọn điều em không muốn. Nhưng anh có thể làm
        phần này đáng yêu, nhây nhây và khó bỏ qua hơn một chút.
      </p>

      {!mood ? (
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
          <motion.button
            onMouseEnter={() => setYesHovered(true)}
            onMouseLeave={() => setYesHovered(false)}
            onClick={handleSoft}
            animate={{ scale: yesHovered ? 1.08 : 1 }}
            className="rounded-full px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold shadow-xl"
          >
            Mình dịu lại nha 💗
          </motion.button>

          <button
            onMouseEnter={() =>
              setNoText(
                playfulNoTexts[
                  Math.floor(Math.random() * playfulNoTexts.length)
                ],
              )
            }
            onClick={() => setMood("still")}
            className="rounded-full px-6 md:px-8 py-3.5 md:py-4 bg-white border border-pink-100 font-bold shadow-lg hover:-translate-y-0.5 transition"
          >
            {noText}
          </button>
        </div>
      ) : mood === "soft" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl md:text-7xl mb-4">💞</div>
          <p className="text-xl md:text-2xl font-bold text-pink-600 mb-2">
            Anh biết em là người dịu dàng nhất mà
          </p>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-6">
            Cảm ơn Thư vì đã mở lòng thêm một chút. Anh sẽ cố gắng bằng hành
            động, không chỉ bằng lời nói.
          </p>
          <button
            onClick={() => setMood(null)}
            className="rounded-full px-6 py-3 bg-slate-900 text-white font-semibold"
          >
            Bấm lại lần nữa
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl md:text-7xl mb-4">🌷</div>
          <p className="text-xl md:text-2xl font-bold text-violet-500 mb-2">
            Oke, anh nhận tín hiệu là em còn giận
          </p>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-6">
            Anh vẫn tôn trọng Thư. Vậy cho anh ở lại đây thêm chút để tiếp tục
            dỗ em nhé.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={handleSoft}
              className="rounded-full px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold shadow-lg"
            >
              Được rồi, dịu lại chút cũng được
            </button>
            <button
              onClick={() => setMood(null)}
              className="rounded-full px-6 py-3 bg-white border border-pink-100 font-bold shadow-lg"
            >
              Cho anh trả lời lại
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function MobileLoveDock() {
  const scrollToId = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-md -translate-x-1/2 md:hidden">
      <div className="grid grid-cols-4 gap-2 rounded-[1.6rem] border border-pink-100 bg-white/92 p-2 shadow-[0_20px_60px_rgba(236,72,153,0.18)] backdrop-blur-xl">
        <button
          onClick={() => scrollToId("top-love")}
          className="rounded-2xl py-3 text-pink-500 bg-pink-50 flex flex-col items-center gap-1 text-[11px] font-semibold"
        >
          <Crown className="h-4 w-4" />
          Đầu
        </button>
        <button
          onClick={() => scrollToId("letter-love")}
          className="rounded-2xl py-3 text-pink-500 bg-pink-50 flex flex-col items-center gap-1 text-[11px] font-semibold"
        >
          <Mail className="h-4 w-4" />
          Thư
        </button>
        <button
          onClick={() => scrollToId("photo-love")}
          className="rounded-2xl py-3 text-pink-500 bg-pink-50 flex flex-col items-center gap-1 text-[11px] font-semibold"
        >
          <Camera className="h-4 w-4" />
          Ảnh
        </button>
        <button
          onClick={() => scrollToId("choice-love")}
          className="rounded-2xl py-3 text-pink-500 bg-pink-50 flex flex-col items-center gap-1 text-[11px] font-semibold"
        >
          <Heart className="h-4 w-4" />
          Reply
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div
      id="top-love"
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 overflow-hidden text-gray-800 relative"
    >
      <DreamyBackground />
      <HeartRain />
      <ScrollProgress />
      <CursorTrail />
      <ClickHeartEffect />
      <BackgroundMusic />
      <PopupLove />
      <EnterOverlay />
      <MobileLoveDock />
      <FloatingDecor />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 relative z-10 pb-32 md:pb-16">
        <section className="relative text-center mb-16 md:mb-24 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_25px_90px_rgba(76,29,149,0.22)]">
          <StarHeroBackground />
          <div className="relative px-4 sm:px-6 py-14 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 border border-white/20 px-4 py-2 shadow-lg mb-5 backdrop-blur-xl">
                <Crown className="text-pink-200" size={18} />
                <span className="text-sm font-semibold text-pink-100">
                  Trang web final boss cho em của anh
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-pink-100 to-violet-100 bg-clip-text text-transparent leading-[1.05]">
                Thư ơi, <br className="hidden md:block" /> em đừng giận anh lâu
                quá nha
              </h1>

              <p className="text-base md:text-xl text-white/85 max-w-2xl mx-auto mb-6 leading-relaxed">
                Anh biết anh đã làm em buồn. Nên anh làm hẳn một góc nhỏ thật
                xinh, thật nhây, thật dễ thương để dỗ Thư dịu lại từng chút một.
              </p>

              <PrincessCompliment />
            </motion.div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
          <PrincessMusicCard />
          <ReasonMachine />
          <DayCounter />
        </section>

        <section className="mb-20">
          <div className="bg-white/85 rounded-[2rem] p-8 md:p-10 shadow-xl border border-pink-100 relative overflow-hidden">
            <div className="absolute right-0 top-0 h-40 w-40 bg-pink-200/25 blur-3xl rounded-full" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-pink-500 font-semibold mb-5">
                <MessageCircleHeart className="h-4 w-4" />
                Một vài điều anh muốn nói với Thư thật lòng
              </div>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed max-w-3xl">
                <TypingText
                  speed={30}
                  text={`Anh xin loi vi da lam em buon. Co the co luc anh chua tinh te, co luc anh phan ung khong du diu dang, va co luc anh de em phai buon nhieu hon muc em dang phai chiu.

Nhung that long anh chua bao gio muon lam em dau. Dieu anh muon giu khong phai la cai toi cua minh, ma la tui minh.

Anh biet loi noi thoi thi chua du, nen anh muon bat dau tu viec lang nghe em tot hon, sua tung dieu nho hon, va yeu em bang cam giac an toan hon.`}
                  className="text-gray-600 text-lg leading-relaxed"
                />
                <p className="text-pink-500 font-semibold">
                  Anh không hoàn hảo, nhưng anh thật lòng và anh vẫn rất thương
                  em.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="letter-love" className="mb-16 md:mb-20">
          <div className="mb-4 md:mb-6">
            <LoveTimeline />
          </div>
          <EnvelopeLetter />
        </section>

        <section className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/85 border border-pink-100 px-4 py-2 shadow-lg mb-4">
              <Flower2 className="text-pink-400 h-4 w-4" />
              <span className="text-sm font-semibold text-pink-500">
                Cute features
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black">
              Những thứ anh để em bận rộn một cách dễ thương
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
            <PromiseList />
            <LockedHeart />
            <MemoryGallery />
            <TinyFAQ />
            <div id="photo-love">
              <PhotoCarousel />
            </div>
            <StickerPainter />
            <MoodMeter />
            <TeaseButtons />
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-8">
            <Star className="mx-auto text-yellow-400 mb-4" />
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Những lời nhắn anh để dành cho em
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bấm từng ô một đi, như mở từng chút dịu dàng anh cất sẵn vậy đó.
            </p>
          </div>
          <LoveNoteWall />
        </section>

        <section className="mb-20">
          <NightModeBlessing />
        </section>

        <section id="choice-love" className="mb-8">
          <ChoiceMoment />
        </section>

        <section className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 rounded-full bg-white/85 border border-pink-100 px-6 py-4 shadow-lg"
          >
            <PartyPopper className="h-5 w-5 text-pink-500" />
            <span className="font-semibold text-gray-700">
              Đi tới cuối trang rồi thì chắc em cũng dịu lại với anh hơn một tí
              rồi đúng không nè 💗
            </span>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default App;

