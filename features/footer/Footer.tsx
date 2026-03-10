import Image from "next/image";

const footerInfo = [
  {
    label: "OPEN",
    value: ["10:30 ~ 19:00"],
  },
  {
    label: "CLOSE",
    value: ["火曜・木曜"],
  },
  {
    label: "TEL",
    value: ["1234-5678-9012"],
  },
  {
    label: "LOC",
    value: ["〒000-4321", "枚方市東香里元町28-37"],
  },
  {
    label: "PARK",
    value: ["3台"],
    sub: ["※空いていない場合はお近くの", "パーキングエリアをご利用ください。"],
  },
];

export default function Footer() {
  return (
    <footer className="sticky bottom-0 h-screen text-white">
      <div className="absolute inset-0 contain-paint">
        <Image
          src="/footer/forest.webp"
          alt=""
          width={1920}
          height={1278}
          className="w-full h-full scale-105 object-cover blur-xs"
        />
        <div className="absolute inset-0 bg-wood-dark/50"></div>
      </div>
      <div className="relative z-10 grid-margin mx-auto h-full">
        <div className="grid sm:grid-cols-[auto_auto] sm:gap-12 justify-center sm:justify-between h-full py-24">
          <div className="grid items-center">
            <a href="#">
              <Image
                src="/logo-white.svg"
                alt="Wood Cafe Moku."
                width={281}
                height={166}
                className="mx-auto"
              />
            </a>
          </div>
          <div className="grid items-end">
            <dl className="flex flex-col gap-4 min-w-xs">
              {footerInfo.map((info) => (
                <div key={info.label} className="flex gap-12 font-mono">
                  <dt className="flex-1">{info.label}</dt>
                  <dd className="flex-3">
                    {info.value.map((value) => (
                      <span key={value} className="block">
                        {value}
                      </span>
                    ))}
                    {info.sub &&
                      info.sub.map((sub) => (
                        <span key={sub} className="block text-xs text-gray-200">
                          {sub}
                        </span>
                      ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </footer>
  );
}
