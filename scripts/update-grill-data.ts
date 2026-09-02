import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateGrill() {
  console.log("Updating Steelora Grill in SQLite database...");

  const data = {
    nameEn: "Steelora Grill",
    nameAr: "شواية ستيلورا",
    shortDescriptionEn:
      "If you love grilling and road trips, this grill is about to be your go-to companion. The Steelora Grill is designed to make your life easier and last for years. Built from heavy-duty steel, it folds and unfolds in seconds with zero hassle.",
    shortDescriptionAr:
      "لو غاوي شوي ورحلات، الشواية دي هتبقى صاحبتك في كل خروجة. شواية ستيلورا مصممة عشان تريحك وتعيش معاك، مصنوعة من صلب قوي يستحمل، وبتتلم وتتفرد في ثواني من غير غلبة.",
    descriptionEn: `If you love grilling and road trips, this grill is about to be your go-to companion. The Steelora Grill is designed to make your life easier and last for years. Built from heavy-duty steel, it folds and unfolds in seconds with zero hassle.

### Why Choose the Steelora Grill? (Key Features):

- **Dual-Tier Grates with a Top Rack:** The top rack is a total game-changer. You can use it to keep your cooked food warm or for slow-cooking, while the main bottom grate handles the heavy-duty direct grilling. More food, less time!
- **High-Heat Steel Construction:** The grill’s body is crafted from thick, durable steel built to withstand the intense heat of charcoal without warping or taking damage.
- **Easy to Fold & Pack:** Save space in your car and at home. Its smart, practical design lets you fold it flat, take it anywhere, and set it up in just two quick steps.
- **Long-Lasting, Rust-Resistant Coating:** Finished with a premium powder coating to protect against rust and harsh weather. It keeps its sleek look and color no matter how much you use it in humid or breezy conditions.
- **Comfortable Built-in Handles:** Specially designed side cutouts make carrying and moving the grill safe, easy, and totally comfortable.

### Dimensions:
- **Length:** 45 cm
- **Width:** 35 cm
- **Height:** 55 cm

This size is the perfect sweet spot. It's large enough to cook a feast for family and friends, but compact enough not to take up annoying storage space.`,
    descriptionAr: `لو غاوي شوي ورحلات، الشواية دي هتبقى صاحبتك في كل خروجة. شواية ستيلورا مصممة عشان تريحك وتعيش معاك، مصنوعة من صلب قوي يستحمل، وبتتلم وتتفرد في ثواني من غير غلبة.

### ليه تختار شواية ستيلورا؟ (المميزات بتاعتها):

- **شبكة شوي وفيها رف علوي:** بص يا سيدي، الرف اللي فوق ده حكاية، تقدر تركن عليه الاكل اللي استوى عشان يفضل سخن، او تشوي عليه الحاجات اللي محتاجة نار هادية، والشبكة اللي تحت شغالة معاك في الشوي الاساسي. يعني هتنجز وتعمل اكل اكتر وتوفر وقتك.
- **صلب يستحمل النار العالية:** جسم الشواية مصنوع من خامات تقيلة وصلب متين قوي عشان يتحمل اعلى درجات الحرارة بتاعت الفحم من غير ما يقوس او يتأثر.
- **بتطبق وتتلم بسهولة:** وفر مساحة في عربيتك ومكان تخزينك. تصميمها العملي بيخليك تطويها وتاخدها معاك اي مكان وتجهزها للشوي في خطوتين بس ومن غير اي تعقيد.
- **دهان يعيش ويقاوم الصدأ:** الشواية واخدة طبقة دهان محترمة عشان تحميها من الصدأ والعوامل الجوية، وتفضل محافظة على شكلها ولونها مهما استخدمتها في الرطوبة او الهواء.
- **مقابض مريحة في الشيل:** الشواية فيها فتحات معمولة مخصوص في الجنب عشان تعرف تشيلها وتنقلها من مكان للتاني بكل سهولة وامان.

### المقاسات بتاعتها:
- **الطول:** 45 سم
- **العرض:** 35 سم
- **الارتفاع:** 55 سم

المقاس ده ممتاز قوي، هيكفي معاك اكل كتير للعيلة والصحاب، وفي نفس الوقت مش هياخد مساحة كبيرة ومزعجة في التخزين.`,
    pricePiasters: 170000,
    compareAtPricePiasters: 190000,
    materialEn: "Heavy-Duty High-Heat Steel with Rust-Resistant Coating",
    materialAr: "صلب متين عالي التحمل للحرارة مع دهان مقاوم للصدأ والعوامل الجوية",
    foldedDimensions: "45 x 35 x 5 cm",
    openDimensions: "45 x 35 x 55 cm",
    whatsIncludedEn: JSON.stringify([
      "Steelora Heavy-Duty Foldable Grill Body",
      "Main Heavy-Duty Grilling Grate",
      "Elevated Top Warming & Resting Rack",
      "Ventilated Charcoal Base Tray with Airflow Slots",
      "Ergonomic Built-in Side Cutout Carrying Handles",
    ]),
    whatsIncludedAr: JSON.stringify([
      "هيكل شواية ستيلورا القابل للطي من الصلب المتين",
      "شبكة شوي رئيسية ثقيلة ومقاومة للحرارة العالية",
      "رف علوي مدمج لتسخين المشويات والطهي على نار هادئة",
      "صينية فحم سفلية بفتحات تهوية مدروسة",
      "فتحات ومقابض جانبية مدمجة لسهولة الشيل والنقل",
    ]),
    specsEn: JSON.stringify({
      "Material": "Heavy-Duty High-Heat Resistant Steel",
      "Coating": "Premium Weather & Rust-Resistant Protective Finish",
      "Grate System": "Dual-Tier Grates (Main Grilling Grate + Top Warming Rack)",
      "Dimensions (L x W x H)": "45 x 35 x 55 cm",
      "Folding Design": "Fast 2-step folding & compact pack-down",
      "Handles": "Ergonomic built-in side cutout carry handles",
      "Fuel Compatibility": "Lump Charcoal, Briquettes, Hardwood",
      "Origin": "Engineered & Manufactured in Cairo, Egypt",
    }),
    specsAr: JSON.stringify({
      "الخامة": "صلب متين عالي التحمل لدرجات الحرارة",
      "نوع الطلاء": "دهان فاخر واقٍ ومقاوم للصدأ والعوامل الجوية",
      "نظام الشواء": "شبكة سفلية رئيسية + رف تسخين علوي متعدد الاستخدامات",
      "المقاسات (طول × عرض × ارتفاع)": "٤٥ × ٣٥ × ٥٥ سم",
      "آلية الطي": "تصميم عملي قابل للطي والتجهيز في خطوتين",
      "المقابض": "فتحات جانبية مدمجة لسهولة الشيل والأمان",
      "نوع الوقود المناسب": "فحم نباتي، قوالب فحم، أخشاب صلبة",
      "بلد المنشأ": "تصنيع وهندسة متطورة في القاهرة، مصر",
    }),
  };

  const updated = await prisma.product.update({
    where: { slug: "foldable-charcoal-bbq-grill" },
    data,
  });

  console.log("✔ Successfully updated product in database:", updated.nameAr, updated.pricePiasters);
}

updateGrill()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
