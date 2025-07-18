"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/header";
import Write from "./components/write";
import Journal from "./components/Journal";
import Mood from "./components/mood";
import Song from "./components/song";
import Quote from "./components/quote";
import Calendar from "./components/calendar";
import TopMood from "./components/topMood";
import Profile from "./components/profile";
import Streak from "./components/streak";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [direction, setDirection] = useState(1);
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("❓");
  const [quote, setQuote] = useState<string[]>([
    "The darkest nights produce the brightest stars. - John Green",
  ]);
  const [spotifyTrack, setSpotifyTrack] = useState<string[]>([
    "Luka Chippi",
    "Seedhe Maut",
  ]);
  const [dailyTips, setDailyTips] = useState<string[]>([
    "Stay positive",
    "Take a deep breath",
    "Smile more",
  ]); // array

  async function fetchTodayJournal() {
    const res = await fetch("/api/journal");
    const data = await res.json();

    console.log("API Response:", data); // 💥 Add this

    if (res.ok && data.journal) {
      setContent(data.journal.content);
      setMood(data.journal.mood || "❓");

      try {
        const aiResponse = data.journal.aiResponse;
        console.log("AI Response Raw:", aiResponse);

        if (aiResponse) {
          const parsed =
            typeof aiResponse === "string"
              ? JSON.parse(aiResponse)
              : aiResponse;
          setQuote(parsed.quote);
          setSpotifyTrack(parsed.song);
          setDailyTips(parsed.suggestion);
        } else {
          console.warn("AI Response is missing");
        }
      } catch (err) {
        console.error("Failed to parse AI response:", err);
      }
    }
  }

  useEffect(() => {
    console.log("useEffect called");

    fetchTodayJournal();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const tabVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -500,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 500,
      opacity: 0,
    }),
  };

  const tabs = [
    { name: "Today's Vibe", id: "home" },
    { name: "About Month", id: "about" },
  ];

  const handleTabChange = (id: string) => {
    setDirection(
      tabs.findIndex((t) => t.id === id) >
        tabs.findIndex((t) => t.id === activeTab)
        ? 1
        : -1
    );
    setActiveTab(id);
  };

  if (status === "loading") {
    return (
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 scale-150">
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
      </div>
    );
  }
  return (
    <div className="relative cursor-default min-h-screen ">
      <Header />

      {loaded && (
        <div>
          <div className="flex flex-row justify-between">
            <Streak />
            <Profile />
          </div>
          <div className="flex items-center mx-auto rounded-full bg-gray-200  justify-center w-fit mt-10 md:mt-36 ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm md:text-md font-semibold transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } rounded-full m-2`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" custom={direction}>
            {activeTab === "home" && (
              <motion.div
                key="home"
                custom={-1}
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <>
                  <div className="hidden md:grid grid-cols-5 grid-rows-5 gap-4 px-32 py-8 min-h-[80vh] w-full z-50">
                    <div className="col-span-2 row-span-5">
                      <Journal content={content} />
                    </div>
                    <div className="col-span-2 row-span-3 col-start-3">
                      <Mood mood={mood} tips={dailyTips} />
                    </div>
                    <div className="row-span-3 col-start-5">
                      <Song name={spotifyTrack[0]} artist={spotifyTrack[1]} />
                    </div>
                    <div className="col-span-3 row-span-2 col-start-3 row-start-4">
                      <Quote quote={quote} />
                    </div>
                  </div>

                  <div className="md:hidden flex flex-col gap-6 px-6 py-8 w-full z-50">
                    <div>
                      <Journal content={content} />
                    </div>
                    <div>
                      <Mood mood={mood} tips={dailyTips} />
                    </div>
                    <div>
                      <Song name={spotifyTrack[0]} artist={spotifyTrack[1]} />
                    </div>
                    <div>
                      <Quote quote={quote} />
                    </div>
                  </div>
                </>
              </motion.div>
            )}
            {activeTab === "about" && (
              <motion.div
                key="about"
                custom={window.innerWidth >= 768 ? 1 : -1}
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="initial md:exit"
                transition={{ duration: 0.4 }}
              >
                <div className="hidden md:grid grid-cols-5 grid-rows-5 gap-4 px-32 py-8 min-h-[80vh] w-full z-50">
                  <div className="col-span-3 row-span-5">
                    <Calendar />
                  </div>
                  <div className="col-span-2 row-span-3 col-start-4">
                    <TopMood />
                  </div>
                  {/* <div className="col-span-2 row-span-2 col-start-4 row-start-4">
                    3
                  </div> */}
                </div>
                <div className="md:hidden flex flex-col gap-6 px-6 py-8 w-full z-50">
                  <div>
                    <Calendar />
                  </div>
                  <div>
                    <TopMood />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="fixed bottom-6 right-6 md:bottom-16  md:right-16 z-50 bg-gray-800 text-white md:p-7 p-5 text-3xl rounded-full shadow-lg hover:bg-gray-900 transition duration-200 "
            onClick={() =>
              document.getElementById("add")?.classList.remove("hidden")
            }
          >
            ✍︎
          </button>

          <Write
            content={content}
            setContent={setContent}
            mood={mood}
            setMood={setMood}
            refetchJournal={fetchTodayJournal}
          />
        </div>
      )}
    </div>
  );
}
