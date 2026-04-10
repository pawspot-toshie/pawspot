"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// SVG paw print icon
function PawIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Toe beans */}
      <ellipse cx="28" cy="22" rx="10" ry="12" />
      <ellipse cx="50" cy="15" rx="10" ry="12" />
      <ellipse cx="72" cy="22" rx="10" ry="12" />
      <ellipse cx="18" cy="44" rx="9" ry="11" />
      {/* Main pad */}
      <path d="M50 38 C28 38 20 52 22 66 C24 78 36 86 50 86 C64 86 76 78 78 66 C80 52 72 38 50 38Z" />
    </svg>
  );
}

// Spot card component
function SpotCard({
  emoji,
  name,
  location,
  tags,
  rating,
  delay,
}: {
  emoji: string;
  name: string;
  location: string;
  tags: string[];
  rating: string;
  delay: string;
}) {
  return (
    <div className={`spot-card animate-slide-up ${delay}`}>
      <div className="h-36 flex items-center justify-center text-6xl" style={{ background: "linear-gradient(135deg, #e8f7ef, #f0fdf9)" }}>
        {emoji}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-bold text-gray-800 text-sm leading-tight">{name}</h4>
          <span className="text-yellow-500 text-xs font-bold ml-2 shrink-0">★ {rating}</span>
        </div>
        <p className="text-gray-400 text-xs mb-2 flex items-center gap-1">
          <span>📍</span>{location}
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "#e8f7ef", color: "#3a9e6b" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Feature card
function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className={`card-hover glass-card rounded-3xl p-8 text-center animate-slide-up ${delay}`}
     
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
        style={{ background: "linear-gradient(135deg, #e8f7ef, #d4f0e4)" }}
      >
        {icon}
      </div>
      <h3 className="font-bold text-gray-800 text-lg mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase
      .from("pre_registrations")
      .insert({ email: email.trim().toLowerCase() });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        setErrorMsg("このメールアドレスはすでに登録済みです");
      } else {
        setErrorMsg("登録に失敗しました。もう一度お試しください");
      }
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3a9e6b, #5bbf87)" }}
            >
              <PawIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: "#217a4e" }}>
              PawSpot
            </span>
          </div>
          <button
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary text-white text-sm font-bold px-5 py-2 rounded-full"
          >
            事前登録する
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero-gradient pt-24 pb-20 relative overflow-hidden">
        {/* Decorative floating paws */}
        <div className="absolute top-16 left-8 animate-float paw-decoration">
          <PawIcon className="w-24 h-24 text-green-500" />
        </div>
        <div className="absolute top-32 right-12 animate-float2 paw-decoration">
          <PawIcon className="w-16 h-16 text-green-400" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float3 paw-decoration">
          <PawIcon className="w-12 h-12 text-green-500" />
        </div>
        <div className="absolute top-1/2 right-4 animate-float paw-decoration" style={{ animationDelay: "2s" }}>
          <PawIcon className="w-20 h-20 text-green-400" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Logo badge */}
          <div className="animate-fade-in inline-flex items-center gap-3 mb-8">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg animate-pulse-soft"
              style={{ background: "linear-gradient(135deg, #3a9e6b, #5bbf87)" }}
            >
              <PawIcon className="w-11 h-11 text-white" />
            </div>
          </div>

          {/* App name */}
          <div className="animate-slide-up delay-100">
            <h1
              className="text-6xl font-black mb-2 tracking-tight"
              style={{
                background: "linear-gradient(135deg, #217a4e, #3a9e6b, #5bbf87)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PawSpot
            </h1>
          </div>

          {/* Catchcopy */}
          <div className="animate-slide-up delay-200">
            <p className="text-2xl font-bold text-gray-700 mt-4 mb-3 leading-relaxed">
              ペットと行けるスポットを、
              <br className="sm:hidden" />
              みんなでつくる。
            </p>
            <p className="text-gray-500 text-base leading-relaxed max-w-lg mx-auto">
              犬や猫と一緒に行けるお出かけスポットをシェアして、
              <br />
              大切なペットとの思い出をもっと増やそう🐾
            </p>
          </div>

          {/* CTA */}
          <div className="animate-slide-up delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary text-white font-bold px-10 py-4 rounded-full text-lg w-full sm:w-auto"
            >
              🐾　無料で事前登録する
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="text-gray-500 font-medium px-6 py-4 rounded-full border-2 border-gray-200 hover:border-green-300 hover:text-green-600 transition-all w-full sm:w-auto"
            >
              詳しく見る →
            </button>
          </div>

          {/* Social proof */}
          <div className="animate-fade-in delay-500 mt-8 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {["🐶", "🐱", "🐕", "😺", "🦮"].map((pet, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-base"
                  style={{ background: "#e8f7ef" }}
                >
                  {pet}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm ml-1">
              <span className="font-bold" style={{ color: "#3a9e6b" }}>1,200人以上</span>が事前登録済み
            </p>
          </div>
        </div>

        {/* Hero phone mockup */}
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <div className="animate-slide-up delay-500 flex justify-center">
            <div
              className="relative w-72 rounded-[40px] shadow-2xl overflow-hidden border-4 border-white"
              style={{ background: "#f0faf5" }}
            >
              {/* Phone notch */}
              <div className="bg-gray-900 h-8 flex items-center justify-center">
                <div className="w-20 h-1.5 rounded-full bg-gray-700" />
              </div>
              {/* App content */}
              <div className="bg-white p-4">
                {/* App header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3a9e6b, #5bbf87)" }}>
                      <PawIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm" style={{ color: "#217a4e" }}>PawSpot</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs">🔔</div>
                    <div className="w-7 h-7 rounded-full overflow-hidden text-sm flex items-center justify-center bg-green-100">🐶</div>
                  </div>
                </div>
                {/* Map area */}
                <div className="h-32 rounded-2xl mb-3 flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #d4f0e4, #e8f7ef)" }}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-3 left-4 w-16 h-2 rounded-full bg-green-400" />
                    <div className="absolute top-6 left-8 w-10 h-2 rounded-full bg-green-300" />
                    <div className="absolute top-9 right-6 w-12 h-2 rounded-full bg-green-400" />
                    <div className="absolute top-14 left-3 w-20 h-2 rounded-full bg-green-300" />
                    <div className="absolute top-20 right-4 w-8 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="absolute top-4 left-1/3">
                    <div className="animate-bounce-gentle w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-base">🐾</div>
                  </div>
                  <div className="absolute top-8 right-1/4">
                    <div className="animate-bounce-gentle w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-base" style={{ animationDelay: "0.5s" }}>🌳</div>
                  </div>
                  <div className="absolute bottom-4 left-1/4">
                    <div className="animate-bounce-gentle w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-base" style={{ animationDelay: "1s" }}>☕</div>
                  </div>
                  <span className="text-green-600 font-bold text-sm z-10">近くのスポットを探す</span>
                </div>
                {/* Mini cards */}
                <div className="space-y-2">
                  {[
                    { emoji: "🌳", name: "代々木公園", tag: "犬OK", stars: "4.8" },
                    { emoji: "☕", name: "森のカフェ Mori", tag: "猫OK", stars: "4.6" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: "#f8fffe" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#e8f7ef" }}>
                        {item.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-700">{item.name}</p>
                        <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#e8f7ef", color: "#3a9e6b" }}>{item.tag}</span>
                      </div>
                      <span className="text-yellow-400 text-xs font-bold">★ {item.stars}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bottom nav */}
              <div className="bg-white border-t border-gray-100 px-4 py-3 flex justify-around">
                {["🗺️", "🔍", "➕", "💬", "👤"].map((icon, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center rounded-xl text-base ${i === 0 ? "text-white" : ""}`}
                    style={i === 0 ? { background: "linear-gradient(135deg, #3a9e6b, #5bbf87)" } : {}}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 px-6" style={{ background: "#fafffe" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: "#e8f7ef", color: "#3a9e6b" }}>
              🐾 できること
            </span>
            <h2 className="text-3xl font-black text-gray-800 mb-4">
              ペットとの毎日が、
              <br />
              もっと楽しくなる
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              PawSpotは、ペットオーナーのためのお出かけコミュニティ。
              スポット情報のシェアからコミュニティ交流まで。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🗺️"
              title="スポットを探す"
              description="犬・猫OKのカフェ、公園、ホテルをマップから簡単に検索。口コミと写真で事前確認もできる。"
              delay="delay-100"
            />
            <FeatureCard
              icon="📸"
              title="思い出をシェア"
              description="訪れたスポットの写真や感想を投稿。ペット自慢の写真でみんなと盛り上がろう。"
              delay="delay-200"
            />
            <FeatureCard
              icon="🤝"
              title="コミュニティ"
              description="同じ犬種・猫種のオーナーと繋がれる。近くのペット友達も見つかる。"
              delay="delay-300"
            />
          </div>
        </div>
      </section>

      {/* ─── SPOTS PREVIEW ─── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #e8f7ef 0%, #f0fdf9 100%)" }}>
        <div className="absolute top-0 right-0 paw-decoration">
          <PawIcon className="w-64 h-64 text-green-400" />
        </div>
        <div className="absolute bottom-0 left-0 paw-decoration">
          <PawIcon className="w-48 h-48 text-green-500" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: "white", color: "#3a9e6b" }}>
              🌟 人気スポット
            </span>
            <h2 className="text-3xl font-black text-gray-800 mb-4">
              みんなのお気に入りスポット
            </h2>
            <p className="text-gray-500">
              全国のペットオーナーが厳選したスポットが集まっています
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SpotCard emoji="🌳" name="代々木公園" location="渋谷区" tags={["犬OK", "広場あり"]} rating="4.8" delay="delay-100" />
            <SpotCard emoji="☕" name="森のカフェ Mori" location="中目黒" tags={["猫OK", "テラス席"]} rating="4.6" delay="delay-200" />
            <SpotCard emoji="🏖️" name="湘南海岸ドッグラン" location="藤沢市" tags={["犬OK", "ドッグラン"]} rating="4.9" delay="delay-300" />
            <SpotCard emoji="🏨" name="ペットの宿 みどり" location="軽井沢" tags={["犬猫OK", "宿泊"]} rating="4.7" delay="delay-500" />
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: "#e8f7ef", color: "#3a9e6b" }}>
              📱 使い方
            </span>
            <h2 className="text-3xl font-black text-gray-800 mb-4">かんたん3ステップ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div
              className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5"
              style={{ background: "linear-gradient(90deg, #3a9e6b, #5bbf87)" }}
            />
            {[
              { step: "01", icon: "📲", title: "アプリを開く", desc: "登録するだけで全国のペット可スポットが一覧で見られる" },
              { step: "02", icon: "📍", title: "スポットを投稿", desc: "お気に入りの場所を写真付きで投稿。みんなに教えてあげよう" },
              { step: "03", icon: "🐾", title: "一緒にお出かけ", desc: "口コミを参考にして、ペットと新しいスポットへ出かけよう" },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                    style={{ background: "linear-gradient(135deg, #e8f7ef, #d4f0e4)" }}
                  >
                    {icon}
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
                    style={{ background: "linear-gradient(135deg, #3a9e6b, #5bbf87)" }}
                  >
                    {step}
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGISTER ─── */}
      <section
        id="register"
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #217a4e 0%, #3a9e6b 50%, #5bbf87 100%)" }}
      >
        {/* Paw decorations */}
        {[
          "absolute top-4 left-4 w-20 h-20 opacity-10",
          "absolute top-8 right-16 w-14 h-14 opacity-10",
          "absolute bottom-8 left-1/3 w-16 h-16 opacity-10",
          "absolute bottom-4 right-4 w-24 h-24 opacity-10",
        ].map((cls, i) => (
          <div key={i} className={cls}>
            <PawIcon className="w-full h-full text-white" />
          </div>
        ))}

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold">
              🎉 事前登録特典あり
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            もうすぐリリース！
            <br />
            今すぐ事前登録を
          </h2>
          <p className="text-white/80 mb-3 leading-relaxed">
            事前登録者には、リリース記念の特典をプレゼント🎁
            <br />
            プレミアム機能1ヶ月無料 + 早期アクセス権付き
          </p>
          <p className="text-white/60 text-sm mb-10">
            ※スパムは送りません。配信解除もいつでもOK
          </p>

          {submitted ? (
            <div className="bg-white/20 backdrop-blur rounded-3xl p-10 text-white">
              <div className="text-6xl mb-4 animate-bounce-gentle">🐾</div>
              <h3 className="text-2xl font-black mb-2">登録ありがとうございます！</h3>
              <p className="text-white/80">
                リリース時にメールでお知らせします。
                <br />
                ペットとのお出かけを楽しみにしていてください！
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg mx-auto w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
                  placeholder="メールアドレスを入力"
                  className="flex-1 px-6 py-4 rounded-full text-gray-700 placeholder-gray-400 outline-none focus:ring-4 focus:ring-white/30 text-base"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-full font-black text-base whitespace-nowrap transition-all disabled:opacity-60"
                  style={{
                    background: "white",
                    color: "#217a4e",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  }}
                >
                  {loading ? "登録中..." : "🐾 無料登録"}
                </button>
              </div>
              {errorMsg && (
                <div className="flex items-center justify-center gap-2 bg-red-500/80 backdrop-blur text-white text-sm font-medium rounded-2xl px-5 py-3">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}
            </form>
          )}

          {/* Stats */}
          <div className="mt-12 flex justify-center gap-12">
            {[
              { num: "1,200+", label: "事前登録者" },
              { num: "全国", label: "対応エリア" },
              { num: "完全", label: "無料スタート" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-white text-2xl font-black">{num}</p>
                <p className="text-white/70 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3a9e6b, #5bbf87)" }}
              >
                <PawIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">PawSpot</p>
                <p className="text-xs">ペットと行けるスポットを、みんなでつくる。</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="#" className="hover:text-white transition-colors">利用規約</a>
              <a href="#" className="hover:text-white transition-colors">お問い合わせ</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>© 2026 PawSpot. All rights reserved. 🐾</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
