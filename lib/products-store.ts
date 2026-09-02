import { prisma } from "@/lib/prisma";
import type { Product, Bundle, Review } from "@prisma/client";

export interface FallbackProduct {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  pricePiasters: number;
  compareAtPricePiasters: number | null;
  images: string;
  category: string;
  mainCategory: string;
  subCategory: string | null;
  materialEn: string;
  materialAr: string;
  foldedDimensions: string;
  openDimensions: string;
  weight: string;
  weightKg: number;
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  whatsIncludedEn: string;
  whatsIncludedAr: string;
  specsEn: string;
  specsAr: string;
  createdAt: Date;
  updatedAt: Date;
  reviews?: Review[];
}

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: "prod_grill_01",
    slug: "foldable-charcoal-bbq-grill",
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
    images: JSON.stringify(["/images/products/grill-1.png", "/images/products/grill-2.png"]),
    category: "CHARCOAL_GRILL",
    mainCategory: "BBQ",
    subCategory: "CHARCOAL_GRILL",
    materialEn: "Heavy-Duty High-Heat Steel with Rust-Resistant Coating",
    materialAr: "صلب متين عالي التحمل للحرارة مع دهان مقاوم للصدأ والعوامل الجوية",
    foldedDimensions: "45 x 35 x 5 cm",
    openDimensions: "45 x 35 x 55 cm",
    weight: "6.8 kg",
    weightKg: 6.8,
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_chair_02",
    slug: "foldable-outdoor-chair",
    nameEn: "Folding Camping Chair",
    nameAr: "كرسي رحلات قابل للطي",
    shortDescriptionEn:
      "Make relaxing by the grill or at the beach even more enjoyable. Comfortable, lightweight, and effortlessly foldable, this chair is designed to accompany you on any road trip, beach day, or balcony hangout without taking up space.",
    shortDescriptionAr:
      "عشان القعدة تحلى قدام الشواية او على البحر، الكرسي ده هو الحل. مريح، خفيف، وبيطبق معاك بسهولة عشان تاخده في اي رحلة او مصيف او حتى تحطه في البلكونة من غير ما ياخد مكان.",
    descriptionEn: `Make relaxing by the grill or at the beach even more enjoyable. Comfortable, lightweight, and effortlessly foldable, this chair is designed to accompany you on any road trip, beach day, or balcony hangout without taking up space.

### Why Choose This Chair? (Key Features):

- **Ergonomic Back Support:** Designed for long-lasting sitting comfort with a supportive backrest that lets you kick back and relax while grilling or enjoying the outdoors.
- **Lightweight & Portable:** Built with a durable metal frame that remains remarkably lightweight, allowing you to move and carry it anywhere without fatigue.
- **Quick 1-Second Flat Folding:** Folds down completely flat in seconds with a single smooth motion, storing easily in any car trunk or closet.
- **Heavy-Duty Reinforced Fabric:** Seat and backrest are crafted from tough, high-tension striped outdoor fabric built to support weight and resist wear while looking stylish.
- **Stable Anti-Skid Rubber Feet:** Base legs are equipped with protective rubber grip caps that prevent slipping and sliding on ceramic tiles, sand, or lawn grass.`,
    descriptionAr: `عشان القعدة تحلى قدام الشواية او على البحر، الكرسي ده هو الحل. مريح، خفيف، وبيطبق معاك بسهولة عشان تاخده في اي رحلة او مصيف او حتى تحطه في البلكونة من غير ما ياخد مكان.

### ليه الكرسي ده اختيار ممتاز؟ (المميزات بتاعته):

- **تصميم مريح للظهر:** الكرسي مصمم عشان يريحك في القعدة لفترات طويلة، وفيه مسند للظهر بيخليك قاعد مرتاح ومسترخي وانت بتشوي او بتستمتع بالجو.
- **خفيف وعملي في الشيل:** الهيكل بتاعه معدن متين بس وزنه خفيف في نفس الوقت، يعني تقدر تشيله وتحركه معاك في اي مكان من غير تعب.
- **سهل التخزين والطي:** بيتلم ويتطبق في ثواني بحركة واحدة، ولما بيتقفل بيبقى رفيع ومش بياخد اي مساحة في شنطة العربية او في البيت.
- **قماش قوي ومتين:** القاعدة والظهر معمولين من قماش مقلم متين ومشدود كويس، بيستحمل الوزن ويعيش معاك، وشكله شيك وعملي.
- **ثابت على الارض:** رجلين الكرسي متغطية بقطع كاوتش من تحت عشان تثبت كويس وماتتزحلقش بيك سواء كنت قاعد على سيراميك، رمل، او نجيل.`,
    pricePiasters: 50000,
    compareAtPricePiasters: 55000,
    images: JSON.stringify(["/images/products/chair-1.png", "/images/products/chair-2.png"]),
    category: "CHAIR",
    mainCategory: "OUTDOOR_FURNITURE",
    subCategory: "CHAIR",
    materialEn: "Lightweight Durable Metal Frame + Heavy-Duty Striped High-Tension Fabric + Rubber Anti-Skid Feet",
    materialAr: "هيكل معدني متين خفيف الوزن + قماش مقلم قوي عالي التحمل + قواعد كاوتش مانعة للانزلاق",
    foldedDimensions: "75 x 48 x 5 cm",
    openDimensions: "48 x 45 x 78 cm (Seat Height: 42 cm)",
    weight: "2.1 kg",
    weightKg: 2.1,
    stock: 45,
    isFeatured: true,
    isBestSeller: true,
    whatsIncludedEn: JSON.stringify([
      "Foldable Camping Chair with Ergonomic Backrest",
      "Integrated Non-Slip Protective Rubber Foot Caps",
    ]),
    whatsIncludedAr: JSON.stringify([
      "كرسي رحلات قابل للطي بمسند ظهر مريح",
      "قواعد كاوتش سفلية مانعة للانزلاق مدمجة",
    ]),
    specsEn: JSON.stringify({
      "Back Support": "Ergonomic angled backrest for extended relaxation",
      Frame: "High-Strength Lightweight Metal Tubular Chassis",
      Fabric: "Reinforced Striped Outdoor Fabric (Sag & Wear Resistant)",
      "Folding Speed": "Instant 1-second ultra-flat fold",
      "Feet Caps": "Heavy-Duty Anti-Skid Rubber Base Protection",
      Origin: "Engineered & Manufactured in Cairo, Egypt",
    }),
    specsAr: JSON.stringify({
      "مسند الظهر": "تصميم مريح يدعم الظهر لفترات جلوس طويلة",
      الهيكل: "هيكل معدني متين وفائق الخفة لسهولة الحمل",
      القماش: "قماش مقلم مشدود عالي التحمل ومقاوم للتمزق",
      "آلية الطي": "طي مسطح فوري بحركة واحدة سريعة",
      القواعد: "أغطية كاوتش مطاطية مانعة للانزلاق على مختلف الأسطح",
      "بلد المنشأ": "تصنيع وهندسة في القاهرة، مصر",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_table_03",
    slug: "foldable-side-table-stool",
    nameEn: "Mini Folding Table",
    nameAr: "ترابيزة الرحلات الصغيرة القابلة للطي",
    shortDescriptionEn:
      "The ultimate lifesaver for every outdoor adventure and barbecue. This compact and ultra-practical mini folding table is lightweight, effortless to fold, and takes virtually zero space in your car trunk or home storage.",
    shortDescriptionAr:
      "القطعة دي هي المنقذ في اي رحلة او خروجة شوي. ترابيزة صغيرة وعملية متصممة عشان تريحك وتنجزك، وزنها خفيف وبتتطبق بكل سهولة عشان ماتاخدش مكان خالص في عربيتك او في التخزين.",
    descriptionEn: `The ultimate lifesaver for every outdoor adventure and barbecue. This compact and ultra-practical mini folding table is lightweight, effortless to fold, and takes virtually zero space in your car trunk or home storage.

### Why You Need This Table (Key Features):

- **Dual-Purpose Versatility:** Use it as a handy side table to hold plates, cups, drinks, or grilling accessories—or use it as a sturdy, comfortable camp stool while cooking over the coals.
- **Strong & Stable X-Frame Architecture:** Engineered with high-strength metal tubing in an X-frame structure that distributes weight evenly for rock-solid stability with zero wobble.
- **Heavy-Duty Webbed Top:** The reinforced high-tension fabric strap surface is built for high weight resistance and long-lasting durability without sagging or fraying.
- **1-Second Instant Folding:** Incredibly quick and simple folding mechanism—just fold together flat in one swift motion with zero effort.
- **Non-Slip Protective Foot Pads:** Equipped with anti-skid floor caps that ensure a secure, steady grip on sand, grass, gravel, or smooth tiles.`,
    descriptionAr: `القطعة دي هي المنقذ في اي رحلة او خروجة شوي. ترابيزة صغيرة وعملية متصممة عشان تريحك وتنجزك، وزنها خفيف وبتتطبق بكل سهولة عشان ماتاخدش مكان خالص في عربيتك او في التخزين.

### ليه الترابيزة دي لازم تكون معاك؟ (المميزات بتاعتها):

- **بتاعة كله (استخدام مزدوج):** تقدر تستخدمها كترابيزة صغيرة تسند عليها اطباق او كوبايات او ادوات الشوي بتاعتك، وتنفع كمان كرسي مريح وعملي تقعد عليه وانت بتشوي.
- **هيكل قوي وثابت:** معمولة من مواسير معدن متينة بتصميم حرف اكس، التصميم ده بيوزع الحمل صح وبيديها ثبات عالي عشان ماتتهزش منك.
- **قماش متين يستحمل:** الجزء اللي فوق معمول من شرايط قماش قوية ومشدودة كويس عشان تستحمل الاستخدام المتكرر وتعيش معاك فترة طويلة من غير ما ترخي او تتقطع.
- **بتتلم وتتفرد في ثانية:** نظام الطي بتاعها سهل وبسيط خالص، بمجرد ما تضمها على بعض بتتقفل، ومش هتحتاج اي مجهود عشان تجهزها.
- **قواعد ضد الزحلقة:** الرجلين بتاعتها فيها قطع حماية من تحت عشان تثبت كويس على الارض وماتتزحلقش، سواء كنت على رمل او زرع او بلاط.`,
    pricePiasters: 30000,
    compareAtPricePiasters: 40000,
    images: JSON.stringify(["/images/products/mini-chair.png"]),
    category: "TABLE",
    mainCategory: "OUTDOOR_FURNITURE",
    subCategory: "TABLE",
    materialEn: "Heavy-Duty Metal Tubular Frame + High-Tension Webbed Straps + Anti-Slip Caps",
    materialAr: "مواسير معدنية متينة مع شرايط قماش معززة عالية الشد وقواعد مانعة للانزلاق",
    foldedDimensions: "35 x 30 x 4 cm",
    openDimensions: "35 x 30 x 38 cm",
    weight: "1.2 kg",
    weightKg: 1.2,
    stock: 50,
    isFeatured: true,
    isBestSeller: false,
    whatsIncludedEn: JSON.stringify([
      "Foldable Mini Camp Table / Stool with X-Frame Design",
      "Integrated Non-Slip Protective Base Caps",
    ]),
    whatsIncludedAr: JSON.stringify([
      "ترابيزة / كرسي رحلات صغيرة قابلة للطي بتصميم حرف X",
      "قواعد سفلية مدمجة مانعة للانزلاق",
    ]),
    specsEn: JSON.stringify({
      Function: "Dual-Use (Campsite Side Table + Sturdy Seating Stool)",
      Frame: "High-Strength Tubular Metal X-Frame Architecture",
      "Top Surface": "High-Tension Reinforced Webbed Straps (Sag-Resistant)",
      "Folding Speed": "Instant 1-second flat-fold mechanism",
      "Base Feet": "Anti-Skid Floor Protection Caps for Sand, Grass & Tile",
      Origin: "Engineered & Manufactured in Cairo, Egypt",
    }),
    specsAr: JSON.stringify({
      الاستخدام: "استخدام مزدوج (ترابيزة جانبية لحمل الأغراض + كرسي مقعد مريح)",
      الهيكل: "مواسير معدنية متينة بتصميم حرف X عالي الثبات",
      السطح: "شرايط قماش قوية ومشدودة عالية التحمل ومقاومة للارتخاء",
      "آلية الطي": "طي فوري سريع ومسطح بالكامل في ثانية واحدة",
      القواعد: "قطع حماية سفلية مانعة للانزلاق على الرمل والزرع والبلاط",
      "بلد المنشأ": "تصنيع وهندسة في القاهرة، مصر",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_bag_04",
    slug: "heavy-duty-tactical-carry-bag",
    nameEn: "Steelora Grill Bag",
    nameAr: "شنطة شواية ستيلورا",
    shortDescriptionEn:
      "Complete your grilling setup and make transport effortless with the custom-designed Steelora Grill Bag. Sleek and heavy-duty, it protects your grill while keeping your car and home clean from ash and residue after every cookout.",
    shortDescriptionAr:
      "عشان تكمل طقم الشوي بتاعك وتريح نفسك في الشيل والحط، عملنالك الشنطة دي مخصوص لشواية ستيلورا. شنطة متينة وشكلها شيك، هتحافظ على الشواية وتخلي عربيتك نظيفة من اي رماد او تراب بعد ما تخلص شوي.",
    descriptionEn: `Complete your grilling setup and make transport effortless with the custom-designed Steelora Grill Bag. Sleek and heavy-duty, it protects your grill while keeping your car and home clean from ash and residue after every cookout.

### Why Choose the Steelora Grill Bag? (Key Features):

- **Tailored Precision Fit:** Custom-sized to fit the folded Steelora Grill perfectly (45 cm length × 35 cm width), making packing and unpacking completely effortless.
- **Heavy-Duty Durable Fabric:** Crafted from high-strength heavy-duty fabric to easily support the grill's weight through years of road trips and camping adventures without tearing.
- **Cleanliness & Car Trunk Protection:** The ultimate solution to prevent soot, ash, and charcoal residue from dirtying your vehicle's trunk or storage space at home.
- **Sleek Premium Design:** Practical black finish with the distinguished gold STEELORA emblem for a stylish, professional look on the go.
- **Comfortable Reinforced Handles:** Double-stitched heavy-duty carry handles designed for a comfortable grip, letting you carry your grill just like a regular bag.

### Dimensions & Details:
- **Length:** 45 cm
- **Width:** 35 cm`,
    descriptionAr: `عشان تكمل طقم الشوي بتاعك وتريح نفسك في الشيل والحط، عملنالك الشنطة دي مخصوص لشواية ستيلورا. شنطة متينة وشكلها شيك، هتحافظ على الشواية وتخلي عربيتك نظيفة من اي رماد او تراب بعد ما تخلص شوي.

### ليه تشتري شنطة ستيلورا؟ (المميزات بتاعتها):

- **مقاس مظبوط بالملي:** الشنطة متفصلة على مقاس الشواية بالظبط وهي متطبقة (الطول 45 سم والعرض 35 سم)، يعني الشواية هتدخل وتخرج براحتها خالص من غير اي تعب.
- **خامة تقيلة وتستحمل:** معمولة من قماش قوي ومتين عشان يستحمل وزن الشواية الحديد ويعيش معاك في السفر والرحلات من غير ما يتقطع او يتبهدل.
- **نظافة وحماية لعربيتك:** الشنطة دي هي الحل السحري اللي هيمنع اي هباب او بواقي فحم انها توسخ شنطة عربيتك او مكان التخزين في البيت.
- **شياكة وتصميم مميز:** لونها اسود عملي ومطبوع عليها لوجو ستيلورا الفخم، عشان تبان شيك واحترافية وانت شايلها.
- **ايد مريحة في الشيل:** مقابض الشنطة متخيطة كويس ومتينة ومريحة في الايد، عشان تنقل الشواية بسهولة كانك شايل شنطة عادية.

### المقاسات والتفاصيل:
- **الطول:** 45 سم
- **العرض:** 35 سم`,
    pricePiasters: 17000,
    compareAtPricePiasters: 20000,
    images: JSON.stringify(["/images/products/bag-1.png"]),
    category: "BBQ_ACCESSORY",
    mainCategory: "BBQ",
    subCategory: "BBQ_ACCESSORY",
    materialEn: "Heavy-Duty High-Strength Dust-Resistant Fabric",
    materialAr: "قماش متين عالي التحمل ومقاوم للأتربة والأوساخ",
    foldedDimensions: "45 x 35 x 3 cm",
    openDimensions: "45 x 35 x 15 cm",
    weight: "0.5 kg",
    weightKg: 0.5,
    stock: 60,
    isFeatured: false,
    isBestSeller: false,
    whatsIncludedEn: JSON.stringify([
      "Original Steelora Grill Bag with Gold Emblem",
      "Reinforced Heavy-Duty Double Carry Handles",
    ]),
    whatsIncludedAr: JSON.stringify([
      "شنطة شواية ستيلورا الأصلية باللوجو الذهبي",
      "مقابض يد مزدوجة متينة ومعززة بالخياطة",
    ]),
    specsEn: JSON.stringify({
      Material: "Heavy-Duty High-Strength Tear-Resistant Fabric",
      Color: "Classic Black with Gold STEELORA Emblem",
      "Dimensions (L x W)": "45 x 35 cm (Tailored to Folded Grill)",
      Handles: "Reinforced Double-Stitched Ergonomic Carry Handles",
      Function: "Protects grill and keeps car trunk/home free from ash and soot",
      Origin: "Engineered & Manufactured in Cairo, Egypt",
    }),
    specsAr: JSON.stringify({
      "الخامة": "قماش ثقيل ومتين عالي التحمل ومقاوم للتمزق",
      "اللون": "أسود أنيق مع شعار ستيلورا الذهبي",
      "المقاسات (طول × عرض)": "٤٥ × ٣٥ سم (متطابقة تماماً مع الشواية)",
      "المقابض": "مقابض حمل يد مريحة ومعززة بخياطة مزدوجة",
      "الاستخدام": "حفظ ونقل شواية ستيلورا وحماية السيارة والمنزل من الرماد",
      "بلد المنشأ": "تصنيع وهندسة في القاهرة، مصر",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_tongs_05",
    slug: "premium-stainless-steel-bbq-tongs",
    nameEn: "BBQ Tongs",
    nameAr: "ملقط شواء",
    shortDescriptionEn:
      "Premium stainless steel BBQ tongs designed for easy and precise food handling while grilling. Featuring a convenient spatula end, scalloped gripping edges, a comfortable non-slip grip, and a locking ring for compact storage.",
    shortDescriptionAr:
      "ملقط شواء ستانلس ستيل فاخر متعدد الاستخدامات مصمم لتحكم فائق أثناء الشواء. يجمع بين ملقط مسنن وملعقة تقليب مدمجة مع مقبض مريح مانع للانزلاق وحلقة قفل للتخزين المدمج.",
    descriptionEn: `### Premium BBQ Tongs for Better Grilling Control\n\nTake your grilling experience to the next level with these Premium Stainless Steel BBQ Tongs, designed to give you better control, precision, and convenience when handling food on the grill.\n\nCrafted with a durable stainless-steel construction, the tongs combine a scalloped gripping end for securely handling food with an integrated spatula-style end that makes flipping, lifting, and serving easier.\n\nThe ergonomic design features a comfortable non-slip grip, helping provide better handling and control during cooking. A built-in locking ring allows the tongs to be closed securely for convenient storage and helps keep your kitchen or grilling tools organized.\n\nWhether you're grilling meat, flipping burgers, serving vegetables, or handling food at the barbecue, this versatile tool is designed to make everyday grilling easier and more efficient.\n\n### Key Features\n- 🔒 **Locking Ring:** The integrated locking ring allows the tongs to be securely closed when not in use, making them easier to store.\n- 🥩 **Multi-Purpose Design:** Combines tongs and a spatula-style end in one practical grilling tool for handling, flipping, lifting, and serving food.\n- 🛡️ **Stainless Steel Construction:** Durable stainless-steel construction designed for everyday grilling and kitchen use.\n- ✋ **Non-Slip Comfort Grip:** The dark grip section provides a more comfortable and controlled handling experience while using the tongs.\n- 🍖 **Scalloped Gripping Edges:** The shaped gripping edges help hold food securely while grilling, flipping, and serving.\n- 🔥 **Ideal for BBQ & Grilling:** Perfect for handling a variety of foods during barbecue and grilling preparation.`,
    descriptionAr: `### ملقط شواء فاخر لتحكم أفضل أثناء الشواء\n\nارتقِ بتجربة الشواء إلى مستوى جديد مع ملقط الشواء الفاخر من الستانلس ستيل، المصمم ليمنحك تحكماً ودقة وسهولة فائقة عند التعامل مع مختلف الأطعمة على الشواية.\n\nمصنوع من هيكل متين من الفولاذ المقاوم للصدأ يجمع بذكاء بين طرف مسنن لإمساك اللحوم بإحكام وطرف عريض بنمط ملعقة تقليب (Spatula) لتسهيل التقليب والرفع والتقديم.\n\nيتميز التصميم المريح بمقبض مانع للانزلاق يوفر راحة وثباتاً أثناء الطهي، مع حلقة قفل مدمجة لإغلاق الملقط بإحكام للتخزين الأنيق والموفر للمساحة.\n\nسواء كنت تشوي اللحوم، تقلب البرجر، تقدم الخضار، أو تجهز المشويات، فإن هذه الأداة متعددة الاستخدامات مصممة لجعل الشواء أسهل وأكثر كفاءة واحترافية.\n\n### الميزات الرئيسية\n- 🔒 **حلقة قفل مدمجة:** تتيح إغلاق الملقط بإحكام لسهولة التخزين وتوفير المساحة.\n- 🥩 **تصميم متعدد الأغراض:** يدمج بين ملقط مسنن وملعقة تقليب مسطحة في أداة شواء عملية واحدة.\n- 🛡️ **هيكل ستانلس ستيل متين:** مقاوم للصدأ والحرارة ومصمم للاستخدام الشاق اليومي.\n- ✋ **مقبض مريح مانع للانزلاق:** يوفر تحكماً آمناً ومريحاً يمنع الانزلاق أثناء تقليب الأطعمة الساخنة.\n- 🍖 **حواف إمساك مسننة:** تصميم مقوس يمسك مختلف الأطعمة بإحكام ودون تمزيق.\n- 🔥 **مثالي للشواء والمطبخ:** الأداة المتكاملة لكافة أعمال الشواء والطهي والتقديم.`,
    pricePiasters: 15000,
    compareAtPricePiasters: 20000,
    images: JSON.stringify(["/images/products/tongs-main.png"]),
    category: "BBQ_ACCESSORY",
    mainCategory: "BBQ",
    subCategory: "BBQ_ACCESSORY",
    materialEn: "Premium Stainless Steel + Non-Slip Comfort Grip",
    materialAr: "ستانلس ستيل فاخر مقاوم للصدأ + مقبض مريح مانع للانزلاق",
    foldedDimensions: "42 x 4.5 x 3.5 cm",
    openDimensions: "42 x 9.5 x 4 cm",
    weight: "0.38 kg",
    weightKg: 0.38,
    stock: 80,
    isFeatured: true,
    isBestSeller: false,
    whatsIncludedEn: JSON.stringify([
      "1 × Stainless Steel BBQ Tongs with Spatula & Locking Ring",
    ]),
    whatsIncludedAr: JSON.stringify([
      "١ × ملقط شواء ستانلس ستيل مع ملعقة تقليب وحلقة قفل",
    ]),
    specsEn: JSON.stringify({
      "Product Type": "Multi-Purpose BBQ Tongs / Grill Serving Tool",
      Material: "Stainless Steel",
      Design: "Multi-Purpose (Scalloped Gripper + Spatula)",
      Grip: "Non-Slip Comfort Grip",
      "End Design": "Scalloped Gripper + Spatula",
      Storage: "Locking Ring",
      Application: "BBQ / Grilling / Kitchen",
      Color: "Stainless Steel / Black Accent",
      Quantity: "1 Piece",
    }),
    specsAr: JSON.stringify({
      "نوع المنتج": "ملقط شواء متعدد الأغراض / أداة تقديم المشويات",
      الخامة: "ستانلس ستيل مقاوم للصدأ",
      التصميم: "متعدد الاستخدامات (ملقط مسنن + ملعقة تقليب)",
      المقبض: "مقبض مريح مانع للانزلاق",
      "تصميم الأطراف": "طرف مسنن + ملعقة تقليب عريضة",
      التخزين: "حلقة قفل سحب مدمجة",
      الاستخدام: "الشواء / الطهي / المطبخ",
      اللون: "فضي ستانلس ستيل / أسود",
      الكمية: "قطعة واحدة",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_brush_06",
    slug: "3-in-1-bbq-cleaning-brush-scraper",
    nameEn: "3-in-1 BBQ Cleaning Brush",
    nameAr: "فرشاة تنظيف الشوايات ٣ في 1",
    shortDescriptionEn:
      "Keep your grill clean and always ready to use with this all-in-one BBQ cleaning brush. A practical design combining 3 tools in 1: a built-in scraper for tough grease, sturdy metal bristles for deep cleaning, and a powerful scrubbing pad, complete with a comfortable grip for perfect, non-slip control.",
    shortDescriptionAr:
      "حافظ على شوايتك نظيفة وجاهزة دائماً مع هذه الفرشاة الشاملة ٣ في ١. تصميم عملي يجمع ٣ أدوات في أداة واحدة: شفرة كشط مدمجة للدهون الصعبة، شعيرات معدنية متينة للتنظيف العميق، وإسفنجة فرك قوية مع مقبض مريح غير قابل للانزلاق.",
    descriptionEn: `### The All-In-One Cleaning Brush for a Clean and Ready Grill\n\nMake post-BBQ grill cleaning a quick and easy task with the 3-in-1 BBQ Cleaning Brush. This tool is designed to be the ultimate solution for efficiently removing burnt-on grease and stuck food residue from your grill grates.\n\nThis smart design integrates three essential functions: a sturdy metal scraper at the front to remove hard buildup, durable metal bristles that penetrate between the grill bars to clean from all angles, and a bottom scrubbing pad for finishing touches and surface polishing.\n\nThanks to the comfortable, dual-arch, non-slip handle design, you can apply strong pressure while cleaning without straining your hands. This brush is the exact tool you need to ensure your grill stays in top condition and ready for your next barbecue.\n\n### Key Features\n- 🧼 **Powerful Scrubbing Pad:** A durable bottom pad perfect for wiping down and polishing the grill surface, removing any fine, leftover residue.\n- ✋ **Comfortable Non-Slip Grip:** An ergonomic design that allows you to hold the brush firmly and securely, providing maximum comfort and control while scrubbing.\n- 🔪 **Built-in Scraper:** A strong metal blade at the front of the brush specifically designed to easily scrape off tough grease and burnt-on food.\n- 🧹 **Sturdy Metal Bristles:** Tough and durable bristles designed to reach tricky corners and between grill grates for a deep, highly effective clean.\n- 🔥 **Keeps Your Grill Clean & Ready:** This comprehensive tool ensures your equipment remains perfectly clean and prepared for use at any time.`,
    descriptionAr: `### فرشاة التنظيف الشاملة ٣ في ١ لشواية نظيفة وجاهزة دائماً\n\nاجعل تنظيف الشواية بعد كل حفلة شواء مهمة سريعة وسهلة مع فرشاة تنظيف الشوايات ٣ في ١ من ستيلورا. صُممت هذه الأداة لتكون الحل الأمثل والنهائي لإزالة الدهون المتفحمة وبقايا الطعام العالقة على شبكات الشواء بكل فاعلية.\n\nيجمع هذا التصميم الذكي بين ثلاث وظائف أساسية: شفرة كشط معدنية صلبة في المقدمة لإزالة التراكمات القاسية، شعيرات معدنية متينة تخترق الفراغات بين قضبان الشبكة لتنظيفها من كافة الزوايا، وإسفنجة فرك سفلية للمسات النهائية وتلميع السطح.\n\nبفضل المقبض المريح ثنائي القوس المانع للانزلاق، يمكنك تطبيق ضغط قوي أثناء التنظيف دون إجهاد يديك أو معصمك، مما يضمن بقاء الشواية في أبهى حالاتها دائماً.\n\n### الميزات الرئيسية\n- 🧼 **إسفنجة فرك قوية:** قاعدة سفلية متينة لتنظيف وتلميع سطح الشبكة وإزالة الرواسب الدقيقة.\n- ✋ **مقبض مريح مانع للانزلاق:** تصميم مقوس ومريح يتيح لك الإمساك بقوة وتحكم تام أثناء التنظيف.\n- 🔪 **شفرة كشط مدمجة:** شفرة فولاذية أمامية قوية لكشط الدهون المتفحمة وبقايا الطعام المستعصية.\n- 🧹 **شعيرات معدنية متينة:** شعيرات صلبة تصل بين أسلاك الشبكة للتنظيف العميق والشامل.\n- 🔥 **تحافظ على الشواية جاهزة ونظيفة:** تضمن بقاء معدات الشواء نظيفة ولامعة وتطيل عمرها الافتراضي.`,
    pricePiasters: 15000,
    compareAtPricePiasters: 20000,
    images: JSON.stringify(["/images/products/grill-brush-main.png"]),
    category: "BBQ_ACCESSORY",
    mainCategory: "BBQ",
    subCategory: "BBQ_ACCESSORY",
    materialEn: "Stainless Steel Scraper + High-Tensile Wire Bristles + Heavy-Duty Scrubbing Pad + Ergonomic Handle",
    materialAr: "شفرة كشط ستانلس ستيل + أسلاك معدنية صلبة + إسفنجة فرك قوية + مقبض مريح معزز",
    foldedDimensions: "15 x 12 x 8 cm",
    openDimensions: "15 x 12 x 8 cm",
    weight: "0.35 kg",
    weightKg: 0.35,
    stock: 75,
    isFeatured: false,
    isBestSeller: false,
    whatsIncludedEn: JSON.stringify([
      "1 × 3-in-1 BBQ Cleaning Brush with Scraper & Scrubbing Pad",
    ]),
    whatsIncludedAr: JSON.stringify([
      "١ × فرشاة تنظيف الشوايات ٣ في ١ مع شفرة كشط وإسفنجة فرك",
    ]),
    specsEn: JSON.stringify({
      "Product Type": "3-in-1 BBQ Cleaning Brush",
      Design: "3-in-1 (Bristles, Scraper, Scrubbing Pad)",
      Grip: "Reinforced Plastic with Ergonomic Non-Slip Design",
      "Bristle Material": "Durable Metal (Wire Bristles)",
      "Scraper Material": "Stainless Steel",
      Application: "Cleaning Grill Grates (Gas, Charcoal, Electric)",
      Color: "Black / Metallic",
      Quantity: "1 Piece",
    }),
    specsAr: JSON.stringify({
      "نوع المنتج": "فرشاة تنظيف الشوايات ٣ في ١",
      التصميم: "٣ في ١ (شعيرات معدنية، شفرة كشط، إسفنجة فرك)",
      المقبض: "بلاستيك مقوى بتصميم مريح مانع للانزلاق",
      "مادة الشعيرات": "معدن متين (شعيرات سلكية صلبة)",
      "مادة شفرة الكشط": "ستانلس ستيل مقاوم للصدأ",
      الاستخدام: "تنظيف شبكات الشواء (غاز، فحم، كهرباء)",
      اللون: "أسود / معدني",
      الكمية: "قطعة واحدة",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_bundle_07",
    slug: "outdoor-luxury-set",
    nameEn: "Steelora Grand Opening Set (6-Piece BBQ & Camping Suite)",
    nameAr: "عرض الافتتاح من ستيلورا - طقم الشوي والرحلات المتكامل (6 قطع)",
    shortDescriptionEn:
      "Still gathering your BBQ tools piece by piece before every trip? We saved you the hassle with our Grand Opening Bundle—combining heavy-duty durability, sleek aesthetics, and an unbeatable launch price in one complete 6-piece suite.",
    shortDescriptionAr:
      "لسه بتدور وتجمع ادوات الشوي قطعة قطعة قبل كل رحلة؟ وفرنا عليك اللفة والتعب وعملنالك عرض الافتتاح اللي بيجمعلك كل اللي هتحتاجه عشان تطلع رحلة شوي على البحر او في اي مكان وتكون جاهز ومستعد.",
    descriptionEn: `Still hunting down your BBQ gear piece by piece before every trip? We saved you the hassle with the **Steelora Grand Opening Bundle**—bringing together everything you need for the ultimate beach cookout or outdoor adventure, fully equipped and ready to go. This complete suite combines lifelong durable materials, sleek design, and an unbeatable launch price.

### What is Included in the Grand Opening Suite (6 Core Pieces):

1. **Portable Steelora Grill:** Smart dual-tier charcoal grill with warming rack, crafted from heavy-duty heat-coated steel built to last for years—not just a single season.
2. **Steelora Grill Bag:** Custom-tailored to the exact folded grill dimensions for effortless transport and keeping your car trunk spotless.
3. **Folding Camping Chair:** Lightweight and ultra-comfortable with an ergonomic backrest and high-tension striped fabric, folding flat in seconds.
4. **Mini Folding Table / Stool:** Compact, ultra-versatile dual-use piece—use it as a side table for plates and accessories or as a sturdy camp stool.
5. **Stainless Steel BBQ Tongs:** Durable rust-resistant tongs with integrated spatula end, scalloped grip, and non-slip handle for ultimate control.
6. **3-in-1 BBQ Cleaning Brush:** Heavy-duty wire bristles, integrated steel scraper, and scouring pad with ergonomic grip to restore your grates to a shine.

### Why Choose the Steelora Grand Opening Set?

- **Unmatched Value & Savings:** Get the entire 6-piece setup for a massive discount compared to buying each item separately.
- **Instant Outdoor Readiness:** Everything packs compactly—grill, bag, chair, table, tongs, and brush—grab it and you're ready for the wild.
- **Built to Endure:** Every single component is meticulously crafted from premium materials engineered for heavy outdoor use and high cooking heat.

*Don't miss out—order the Grand Opening Bundle now. Limited launch quantity available!*`,
    descriptionAr: `لسه بتدور وتجمع ادوات الشوي قطعة قطعة قبل كل رحلة؟ وفرنا عليك اللفة والتعب وعملنالك "عرض الافتتاح" اللي بيجمعلك كل اللي هتحتاجه عشان تطلع رحلة شوي على البحر او في اي مكان وتكون جاهز ومستعد. العرض ده متكامل بيجمع بين الخامات اللي تعيش معاك، والتصميم الشيك، والسعر اللي ميتفوتش.

### محتويات عرض الافتتاح (6 قطع اساسية):

1. **شواية ستيلورا المحمولة:** شواية فحم بتصميم ذكي بدورين، متينة ومدهونة حراري عشان تعيش معاك سنين ومش شواية بتاعت موسم واحد وتبوظ.
2. **شنطة شواية ستيلورا:** شنطة شيك متفصلة بالملي على مقاس الشواية، عشان تطبقها وتشيلها فيها بكل سهولة وتمنع اي كركبة في عربيتك بعد النهارده.
3. **كرسي رحلات قابل للطي:** كرسي مريح وزنه خفيف، ظهره وقاعدته من قماش متين قوي، وبيطبق معاك في ثانية عشان القعدة تحلى قدام النار.
4. **ترابيزة وكرسي صغير للرحلات:** قطعة عملية جدا وخفيفة، تقدر تستخدمها كترابيزة تسند عليها ادواتك واطباقك، او كرسي صغير تقعد عليه جنب الشواية.
5. **ماسك شوي ستانلس ستيل:** ماسك متين بيعيش معاك ومقاوم للصدأ، تصميمه بيخليك تمسك الاكل وتقلب براحتك، وفيه مكان مريح للايد عشان مايزحلقش ويديك تحكم كامل.
6. **فرشة تنظيف الشواية 3 في 1:** فرشة قوية فيها سلك معدن ومكشطة مدمجة عشان تشيل اي دهون لازقة وترجع الشواية بتلمع تاني، ومسكتها مريحة قوي في الايد.

### ليه تطلب عرض الافتتاح من ستيلورا؟

- **توفير ملوش مثيل:** بدل ما تشتري كل قطعة لوحدها وتدفع مبلغ كبير، العرض ده هيوفرلك فلوس كتير قوي.
- **جاهز على الخروج:** الشنطة فيها الشواية، والادوات في ايدك، والكراسي معاك، تاخد العرض وتطلع على طول تعيش احلى جو.
- **خامات تستحمل:** كل حتة في العرض ده مختارينها بعناية من اقوى الخامات عشان تستحمل معاك الاستخدام الشاق والحرارة العالية.

*ماتفوتش الفرصة واطلب عرض الافتتاح دلوقتي، الكمية محدودة والسعر ده بمناسبة الافتتاح بس.*`,
    pricePiasters: 257000,
    compareAtPricePiasters: 297000,
    images: JSON.stringify(["/images/products/pro-max.jpg"]),
    category: "BUNDLE",
    mainCategory: "BUNDLE",
    subCategory: "BUNDLE",
    materialEn: "Premium Heat-Coated Steel Grill + Stainless Steel Accessories & Tactical Fabric",
    materialAr: "شواية صلب متين مدهون حرارياً + ملحقات ستانلس ستيل وأقمشة معززة فائقة التحمل",
    foldedDimensions: "Entire set packs down to 48 x 35 x 22 cm",
    openDimensions: "Complete 6-piece campsite living & gourmet grilling suite",
    weight: "9.8 kg Total",
    weightKg: 9.8,
    stock: 25,
    isFeatured: true,
    isBestSeller: true,
    whatsIncludedEn: JSON.stringify([
      "Portable Steelora Grill (with Main Grate & Upper Warming Rack)",
      "Custom Steelora Grill Bag (Heavy-Duty Fabric & Carry Handles)",
      "Folding Camping Chair (Ergonomic Back Support & Striped Canvas)",
      "Mini Folding Table & Camp Stool (Dual-Use X-Frame)",
      "Multi-Purpose Stainless Steel BBQ Tongs (with Spatula & Locking Ring)",
      "3-in-1 BBQ Cleaning Brush (with Steel Scraper & Scrubbing Pad)",
    ]),
    whatsIncludedAr: JSON.stringify([
      "شواية ستيلورا المحمولة (مع رف التسخين العلوي وشبكة الشواء)",
      "شنطة شواية ستيلورا المخصصة (قماش متين ومقابض مريحة)",
      "كرسي رحلات قابل للطي (مسند ظهر مريح وقماش مقلم متين)",
      "ترابيزة وكرسي صغير للرحلات قابل للطي (استخدام مزدوج)",
      "ماسك شوي ستانلس ستيل متعدد الاستخدامات (مع ملعقة تقليب وقفل)",
      "فرشاة تنظيف الشوايات ٣ في ١ (مع شفرة كشط وإسفنجة فرك)",
    ]),
    specsEn: JSON.stringify({
      "Set Components": "6 Core Precision Items (Grill, Bag, Chair, Table, Tongs, Brush)",
      "Total Weight": "9.8 kg",
      "Pack Size": "Fits easily in any sedan trunk or rooftop box",
      Warranty: "10-Year Comprehensive Structural Guarantee",
      Shipping: "Free Insured Express Delivery across Egypt",
    }),
    specsAr: JSON.stringify({
      "مكونات العرض": "٦ قطع أساسية (شواية، شنطة، كرسي، ترابيزة/مقعد، ماسك شوي، فرشاة تنظيف)",
      "الوزن الإجمالي": "٩٫٨ كجم",
      "حجم التخزين": "يمكن وضعه بسهولة في صندوق أي سيارة صغيرة",
      الضمان: "ضمان هيكلي شامل لمدة ١٠ سنوات",
      "الشحن والتوصيل": "شحن مجاني سريع ومؤمن لكافة أنحاء مصر",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getStoreProducts(where?: Record<string, unknown>, orderBy?: any): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: where as any,
      orderBy: orderBy as any,
    });
    if (products && products.length > 0) {
      return products;
    }
  } catch (error) {
    console.warn("Prisma products fetch failed, using memory fallback:", error);
  }
  return FALLBACK_PRODUCTS as unknown as Product[];
}

export async function getStoreProductBySlug(slug: string): Promise<(Product & { reviews: Review[] }) | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (product) {
      return product;
    }
  } catch (error) {
    console.warn(`Prisma findUnique for slug ${slug} failed, using memory fallback:`, error);
  }

  const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
  if (!fallback) return null;

  return {
    ...fallback,
    reviews: [],
  } as unknown as Product & { reviews: Review[] };
}
