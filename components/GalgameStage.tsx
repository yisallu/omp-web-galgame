"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";

type GalScene = "afterschool" | "midnight";

const AFTERSCHOOL_LINES = [
  "「先輩、今日も一緒にコード書きましょうね…♡ どんなバグでも私にお任せください！」",
  "「えへへ、そんなに見つめられると…ちょっと恥ずかしいですよ…♥」",
  "「放課後の部室で二人きり…なんだか秘密の特訓みたいでドキドキしますね♡」",
  "「コーヒー淹れましたよ♪ 疲れたらいつでも私の膝で休んでいいですからね…♡」",
];

const MIDNIGHT_LINES = [
  "「こんな夜遅くに私の部屋まで来てくれるなんて…先輩、もう帰しませんよ…♥」",
  "「あ、あの…この部屋着、先輩のために選んだんです…似合ってますか…？♡」",
  "「深夜のデバッグが終わったら…ご褒美、いっぱい用意してありますからね…♥」",
  "「先輩の声が聞きたくて眠れなかったんです…もう少しだけ、そばにいてください♡」",
];

const PETALS = [
  { left: "6%", delay: "0s", dur: "13s", size: 14, drift: "60px" },
  { left: "16%", delay: "2.2s", dur: "15s", size: 11, drift: "-45px" },
  { left: "27%", delay: "4.5s", dur: "12s", size: 16, drift: "70px" },
  { left: "38%", delay: "1.1s", dur: "16s", size: 12, drift: "-55px" },
  { left: "49%", delay: "6.0s", dur: "14s", size: 15, drift: "50px" },
  { left: "61%", delay: "3.3s", dur: "13.5s", size: 10, drift: "-40px" },
  { left: "72%", delay: "5.2s", dur: "15.5s", size: 14, drift: "65px" },
  { left: "83%", delay: "0.7s", dur: "12.5s", size: 13, drift: "-50px" },
  { left: "92%", delay: "3.9s", dur: "14.5s", size: 15, drift: "40px" },
];

export function GalgameStage() {
  const { isGalgame } = useTheme();
  const [scene, setScene] = useState<GalScene>("afterschool");
  const [showChara, setShowChara] = useState(true);
  const [cgMode, setCgMode] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [heartBurst, setHeartBurst] = useState(0);

  useEffect(() => {
    try {
      const urlScene = new URLSearchParams(window.location.search).get("scene") as GalScene | null;
      const savedScene = (urlScene || localStorage.getItem("omp-gal-scene")) as GalScene | null;
      if (savedScene === "afterschool" || savedScene === "midnight") {
        setScene(savedScene);
      }
      const savedChara = localStorage.getItem("omp-gal-chara");
      if (savedChara === "0") setShowChara(false);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const cl = document.documentElement.classList;
    if (isGalgame && cgMode) {
      cl.add("gal-cg-mode");
    } else {
      cl.remove("gal-cg-mode");
    }
    return () => cl.remove("gal-cg-mode");
  }, [isGalgame, cgMode]);

  useEffect(() => {
    const cl = document.documentElement.classList;
    if (isGalgame && showChara) {
      cl.add("gal-chara-visible");
    } else {
      cl.remove("gal-chara-visible");
    }
    return () => cl.remove("gal-chara-visible");
  }, [isGalgame, showChara]);

  const toggleScene = useCallback(() => {
    setScene((prev) => {
      const next: GalScene = prev === "afterschool" ? "midnight" : "afterschool";
      try {
        localStorage.setItem("omp-gal-scene", next);
      } catch {
        // ignore
      }
      return next;
    });
    setLineIdx(0);
    setShowBubble(true);
    setHeartBurst((n) => n + 1);
  }, []);

  const toggleChara = useCallback(() => {
    setShowChara((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("omp-gal-chara", next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const triggerTalk = useCallback(() => {
    setShowBubble(true);
    setLineIdx((i) => (i + 1) % 4);
    setHeartBurst((n) => n + 1);
  }, []);

  if (!isGalgame) return null;

  const lines = scene === "afterschool" ? AFTERSCHOOL_LINES : MIDNIGHT_LINES;
  const currentLine = lines[lineIdx % lines.length];

  return (
    <>
      {/* Full-viewport Visual Novel Background CG + Atmosphere */}
      <div className="gal-stage-backdrop" aria-hidden="true">
        <div
          className="gal-bg-layer"
          style={{
            backgroundImage: "url('/galgame/bg-sakura.jpg')",
            opacity: scene === "afterschool" ? 1 : 0,
          }}
        />
        <div
          className="gal-bg-layer"
          style={{
            backgroundImage: "url('/galgame/bg-night.jpg')",
            opacity: scene === "midnight" ? 1 : 0,
          }}
        />
        <div className={`gal-atmosphere-veil ${scene === "midnight" ? "is-midnight" : "is-afterschool"}`} />

        {/* Drifting Sakura Petals */}
        <div className="gal-petals-container">
          {PETALS.map((p, idx) => (
            <span
              key={idx}
              className="gal-petal"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.dur,
                width: p.size,
                height: p.size * 0.72,
                "--petal-drift": p.drift,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Top-Left Galgame Date / Route / Affection HUD */}
      <div className="gal-corner-hud" role="region" aria-label="Galgame Route Status">
        <div className="gal-hud-date-row">
          <span className="gal-hud-date-num">10.25</span>
          <span className="gal-hud-day-badge">SUN</span>
          <span className={`gal-hud-time-pill ${scene === "midnight" ? "is-night" : "is-day"}`}>
            {scene === "afterschool" ? "☀ 放課後 AFTER SCHOOL" : "🌙 深夜 SECRET NIGHT ♥"}
          </span>
        </div>
        <div className="gal-hud-route-row">
          <span className="gal-hud-route-title">
            {scene === "afterschool"
              ? "✦ CHAPTER 04 // 桜舞う放課後のプロンプト"
              : "♥ SECRET ROUTE // 真夜中の二人きりデバッグ ♥"}
          </span>
          <span className="gal-hud-hearts" title="ヒロイン好感度 MAX">
            好感度 <span className="gal-hearts-icons">♥♥♥♥♥</span>
          </span>
        </div>
      </div>

      {/* Heroine Tachie Stage (Right side of screen) */}
      {showChara && (
        <div className="gal-heroine-stage">
          {/* Interactive Galgame Speech Bubble */}
          {showBubble && (
            <div className="gal-heroine-bubble" key={`${scene}-${lineIdx}`}>
              <div className="gal-heroine-bubble-header">
                <span className="gal-heroine-bubble-name">♥ 白桜 詩乃 (Shino)</span>
                <button
                  type="button"
                  className="gal-heroine-bubble-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBubble(false);
                  }}
                  title="台詞バルーンを閉じる"
                >
                  ×
                </button>
              </div>
              <div className="gal-heroine-bubble-text" onClick={triggerTalk}>
                {currentLine}
              </div>
            </div>
          )}

          {/* Floating Heart Burst on Interaction */}
          <div className="gal-heart-burst" key={heartBurst} aria-hidden="true">
            <span>♥</span>
            <span>♡</span>
            <span>♥</span>
          </div>

          {/* Character Tachie Sprite */}
          <div
            className="gal-heroine-sprite-wrap"
            onClick={triggerTalk}
            title="クリックして詩乃と会話 ♥"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scene === "afterschool" ? "/galgame/heroine.png" : "/galgame/heroine-night.png"}
              alt="Shino Shirasakura"
              className="gal-heroine-img"
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* Galgame Quick System Menu Bar (AUTO / SCENE / CHARA / TALK / CG MODE) */}
      <div className="gal-quick-bar" role="toolbar" aria-label="Galgame ADV System Controls">
        <button
          type="button"
          className={`gal-qbtn ${scene === "midnight" ? "is-active-night" : "is-active-day"}`}
          onClick={toggleScene}
          title="昼（放課後の部室）/ 夜（深夜の私室・エロゲルート）を切り替え"
        >
          <span className="gal-qbtn-dot">♥</span>
          <span>{scene === "afterschool" ? "SCENE: 放課後 🌸" : "SCENE: 深夜の私室 ♥"}</span>
        </button>
        <button
          type="button"
          className="gal-qbtn"
          onClick={triggerTalk}
          title="ヒロインの台詞を聞く"
        >
          <span>🔊 VOICE / 台詞</span>
        </button>
        <button
          type="button"
          className={`gal-qbtn ${showChara ? "is-on" : ""}`}
          onClick={toggleChara}
          title="ヒロイン立ち絵の表示 / 非表示"
        >
          <span>👗 立ち絵: {showChara ? "ON" : "OFF"}</span>
        </button>
        <button
          type="button"
          className="gal-qbtn"
          onClick={() => setCgMode(true)}
          title="UIを隠してCGと立ち絵を鑑賞"
        >
          <span>✨ CG鑑賞 (HIDE)</span>
        </button>
      </div>

      {/* CG Appreciation Overlay (click anywhere to exit CG mode) */}
      {cgMode && (
        <div
          className="gal-cg-exit-overlay"
          onClick={() => setCgMode(false)}
          title="クリックしてADV画面に戻る"
        >
          <div className="gal-cg-exit-pill">
            ♥ CG APPRECIATION MODE · 画面クリックで戻る ({scene === "afterschool" ? "放課後の部室" : "深夜の私室 ♥"})
          </div>
        </div>
      )}
    </>
  );
}
