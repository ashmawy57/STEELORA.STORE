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
    nameEn: "Foldable Charcoal BBQ Grill (with Warming Rack)",
    nameAr: "شواية فحم فاخرة قابلة للطي (مع رف تسخين علوي)",
    shortDescriptionEn:
      "Precision-engineered 304 stainless steel foldable BBQ system. Features upper resting warming rack, dual air vents, and rapid 10-second setup.",
    shortDescriptionAr:
      "شواية فحم فاخرة قابلة للطي مصنوعة بدقة هندسية من الستانلس ستيل ٣٠٤ مع رف تسخين علوي وفتحات تهوية مزدوجة وطي كامل في ١٠ ثوانٍ.",
    descriptionEn: `Engineered for the discerning pitmaster. The STEELORA Foldable Charcoal BBQ Grill is laser-cut from heavy-gauge food-grade 304 stainless steel. Includes a specialized multi-level upper warming rack that keeps resting meats juicy and warm.`,
    descriptionAr: `صُممت لعشاق الشواء والرحلات الراقية. شواية الفحم الفاخرة من ستيلورا مقطوعة بالليزر من أجود أنواع الفولاذ المقاوم للصدأ بدرجة ٣٠٤ الغذائية. مزودة بـ رف تسخين علوي متعدد المستويات لحفظ اللحوم دافئة وعصارية.`,
    pricePiasters: 795000,
    compareAtPricePiasters: 890000,
    images: JSON.stringify(["/images/products/grill-1.png", "/images/products/grill-2.png"]),
    category: "CHARCOAL_GRILL",
    mainCategory: "BBQ",
    subCategory: "CHARCOAL_GRILL",
    materialEn: "100% Food-Grade AISI 304 Stainless Steel (2.0mm Chassis + 3.0mm Heavy Grate)",
    materialAr: "ستانلس ستيل ٣٠٤ غذائي نقي ١٠٠٪ (هيكل سماكة ٢٫٠ ملم + شبكة شواء ٣٫٠ ملم)",
    foldedDimensions: "48 x 35 x 4.5 cm (Completely Flat Ultra-Slim Profile)",
    openDimensions: "48 x 35 x 38 cm (Working Grilling Height with Dual Tier)",
    weight: "6.8 kg",
    weightKg: 6.8,
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
    whatsIncludedEn: JSON.stringify([
      "Foldable 304 Stainless Steel BBQ Chassis",
      "Heavy-Duty 304 Stainless Steel Grill Grate (45x30 cm)",
      "Upper Level Resting & Warming Rack (45x12 cm)",
      "Stainless Steel Charcoal Base Plate with Ash Flow Holes",
      "Reinforced 1000D Tactical Cordura Carry Bag",
      "Stainless Steel Grate Lifter & Multitool",
    ]),
    whatsIncludedAr: JSON.stringify([
      "هيكل شواية ستيلورا الفاخر القابل للطي من الستانلس ستيل ٣٠٤",
      "شبكة شواء ثقيلة من الستانلس ستيل ٣٠٤ (٤٥ × ٣٠ سم)",
      "رف تسخين علوي مدمج لحفظ اللحوم دافئة (٤٥ × ١٢ سم)",
      "صينية فحم سفلية من الستانلس ستيل مع فتحات تهوية متطورة",
      "حقيبة حمل تكتيكية معززة ومبطنة من قماش الكوردورا ١٠٠٠ دي",
      "أداة رفع وتحريك الشبكة متعددة الوظائف من الستانلس ستيل",
    ]),
    specsEn: JSON.stringify({
      "Steel Grade": "AISI 304 Food & Marine Grade (18/8 Stainless Steel)",
      "Primary Grill Area": "1,350 sq cm (45 x 30 cm)",
      "Warming Rack Area": "540 sq cm (45 x 12 cm)",
      "Heat Tolerance": "Up to 800°C continuous charcoal heat",
      "Fuel Compatibility": "Lump Charcoal, Briquettes, Hardwood Chunks",
      "Setup Time": "Under 10 seconds - No tools required",
      "Country of Origin": "Engineered & Manufactured in Cairo, Egypt",
    }),
    specsAr: JSON.stringify({
      "درجة الفولاذ": "ستانلس ستيل AISI 304 (18/8)",
      "مساحة سطح الشواء": "١,٣٥٠ سم مربع",
      "مساحة رف التسخين": "٥٤٠ سم مربع",
      "مقاومة درجات الحرارة": "حتى ٨٠٠ درجة مئوية",
      "نوع الوقود المناسب": "فحم نباتي نقي، قوالب فحم، أخشاب صلبة",
      "زمن الطي": "أقل من ١٠ ثوانٍ",
      "بلد المنشأ": "تصنيع وهندسة متطورة في القاهرة، مصر",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_chair_02",
    slug: "foldable-outdoor-chair",
    nameEn: "Foldable Outdoor Luxury Chair",
    nameAr: "كرسي تخييم فاخر قابل للطي",
    shortDescriptionEn:
      "Ergonomic luxury outdoor chair with tubular 304 stainless steel frame and water-repellent heavy canvas.",
    shortDescriptionAr:
      "كرسي تخييم مريح ومصمم هندسياً بهيكل أنبوبي من الستانلس ستيل ٣٠٤ وقماش معزز عالي المتانة.",
    descriptionEn: `Engineered for ultimate comfort under the stars. The STEELORA Foldable Outdoor Chair utilizes a high-tensile 304 stainless steel tubular architecture paired with double-layered 1000D waterproof ballistic canvas. Supports up to 180kg.`,
    descriptionAr: `صُمم ليمنحك أقصى درجات الراحة والاسترخاء تحت السماء المفتوحة. يعتمد كرسي ستيلورا الخارجي القابل للطي على هيكل أنبوبي صلب من الستانلس ستيل ٣٠٤ مع طبقتين من قماش الكوردورا ١٠٠٠ دي المقاوم للماء والتآكل. يتحمل حتى ١٨٠ كجم.`,
    pricePiasters: 395000,
    compareAtPricePiasters: 460000,
    images: JSON.stringify(["/images/products/chair-1.png", "/images/products/chair-2.png"]),
    category: "CHAIR",
    mainCategory: "OUTDOOR_FURNITURE",
    subCategory: "CHAIR",
    materialEn: "304 Stainless Steel Tubular Frame + 1000D Waterproof Cordura Canvas",
    materialAr: "هيكل أنبوبي من الستانلس ستيل ٣٠٤ + قماش كوردورا عسكري مضاد للماء",
    foldedDimensions: "58 x 12 x 12 cm",
    openDimensions: "55 x 58 x 82 cm (Seat Height: 42 cm)",
    weight: "3.4 kg",
    weightKg: 3.4,
    stock: 45,
    isFeatured: true,
    isBestSeller: true,
    whatsIncludedEn: JSON.stringify([
      "Foldable 304 Stainless Steel Luxury Chair",
      "Reinforced Heavy-Duty Shoulder Sling Carry Sleeve",
      "4x Anti-Sink Sand Foot Guards",
    ]),
    whatsIncludedAr: JSON.stringify([
      "كرسي تخييم فاخر قابل للطي من الستانلس ستيل ٣٠٤",
      "جراب حمل مبطن مع حزام كتف مريح",
      "٤ قواعد مانعة للغوص في الرمال الناعمة",
    ]),
    specsEn: JSON.stringify({
      Fabric: "1000D Ballistic PU-Coated Waterproof Cordura",
      "Load Capacity": "180 kg (396 lbs)",
      "Seat Height": "42 cm",
      "UV Resistance": "Grade 5 UV-Proof",
    }),
    specsAr: JSON.stringify({
      "مادة القماش": "نايلون كوردورا تكتيكي ١٠٠٠ دي مقاوم للماء",
      "قدرة التحمل": "١٨٠ كجم",
      "ارتفاع المقعد": "٤٢ سم",
      "مقاومة أشعة الشمس": "درجة ٥ مقاومة للبهتان",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_table_03",
    slug: "foldable-side-table-stool",
    nameEn: "Foldable Side Table / Stool",
    nameAr: "طاولة جانبية ومقعد قابل للطي",
    shortDescriptionEn:
      "Dual-function precision brushed 304 stainless steel surface. Serves as a campsite table or 150kg stool.",
    shortDescriptionAr:
      "طاولة جانبية ومقعد مزدوج الوظائف مصنوع من الستانلس ستيل ٣٠٤ المصقول والمخرم بالليزر بقدرة تحمل ١٥٠ كجم.",
    descriptionEn: `Precision versatility at its finest. The STEELORA Foldable Side Table & Stool features a laser-cut geometric tabletop that allows heat dissipation and fluid drainage. Supports 150kg.`,
    descriptionAr: `قمة التنوع الهندسي العملي. تتميز طاولة ومقعد ستيلورا بسطح علوي مخرم بدقة الليزر لتصريف السوائل وتشتيت الحرارة، وتتحمل وزناً حتى ١٥٠ كجم.`,
    pricePiasters: 285000,
    compareAtPricePiasters: 340000,
    images: JSON.stringify(["/images/products/mini-chair.png"]),
    category: "TABLE",
    mainCategory: "OUTDOOR_FURNITURE",
    subCategory: "TABLE",
    materialEn: "Brushed 304 Stainless Steel (1.8mm plate + tubular legs)",
    materialAr: "ستانلس ستيل ٣٠٤ مصقول بلمسة ساتان ناعمة (سماكة ١٫٨ ملم)",
    foldedDimensions: "40 x 30 x 3.5 cm",
    openDimensions: "40 x 30 x 42 cm",
    weight: "2.6 kg",
    weightKg: 2.6,
    stock: 50,
    isFeatured: true,
    isBestSeller: false,
    whatsIncludedEn: JSON.stringify([
      "Foldable 304 Stainless Steel Table / Stool",
      "Compact Protective Storage Sleeve",
    ]),
    whatsIncludedAr: JSON.stringify([
      "طاولة ومقعد ستانلس ستيل ٣٠٤ قابل للطي",
      "جراب حماية وتخزين مدمج",
    ]),
    specsEn: JSON.stringify({
      Material: "Brushed 304 Stainless Steel",
      "Load Capacity": "150 kg (Stool function)",
      "Folded Thickness": "3.5 cm Flat",
      "Top Surface": "Laser-Perforated Thermal Mesh",
    }),
    specsAr: JSON.stringify({
      الخامة: "ستانلس ستيل ٣٠٤ عالي الجودة",
      "قدرة التحمل": "١٥٠ كجم (كمقعد صلب)",
      "سماكة الطي": "٣٫٥ سم فقط",
      "السطح العلوي": "شبكة مخرمة بالليزر لتصريف الحرارة",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_bag_04",
    slug: "heavy-duty-tactical-carry-bag",
    nameEn: "Reinforced Tactical Carry Bag",
    nameAr: "حقيبة حمل تكتيكية معززة",
    shortDescriptionEn:
      "1000D ballistic Cordura gear transport bag with gold hardware, Molle straps, and reinforced interior padding.",
    shortDescriptionAr:
      "حقيبة نقل معدات فاخرة من قماش الكوردورا ١٠٠٠ دي مع بطانة داخلية سميكة وسحابات يابانية مزدوجة.",
    descriptionEn: `Crafted to protect your investment. The STEELORA Tactical Carry Bag features military-grade 1000D Cordura fabric, heavy-duty interior thermal-resistant lining, and champagne gold metal hardware.`,
    descriptionAr: `صُنعت لحماية تجهيزاتك الفولاذية الثمينة. تتميز الحقيبة بقماش كوردورا عسكري ١٠٠٠ دي المقاوم للتمزق، مع بطانة داخلية معززة لمقاومة الحرارة وسحابات معدنية متينة.`,
    pricePiasters: 120000,
    compareAtPricePiasters: 150000,
    images: JSON.stringify(["/images/products/bag-1.png"]),
    category: "BBQ_ACCESSORY",
    mainCategory: "BBQ",
    subCategory: "BBQ_ACCESSORY",
    materialEn: "1000D Ballistic Cordura + YKK Dual Zippers + High-Density Foam",
    materialAr: "قماش كوردورا ١٠٠٠ دي مضاد للماء + سحابات YKK مزدوجة + إسفنج عالي الكثافة",
    foldedDimensions: "48 x 32 x 4 cm",
    openDimensions: "48 x 32 x 18 cm",
    weight: "0.7 kg",
    weightKg: 0.7,
    stock: 60,
    isFeatured: false,
    isBestSeller: false,
    whatsIncludedEn: JSON.stringify([
      "1000D Reinforced Tactical Carry Bag",
      "Padded Adjustable Ergonomic Shoulder Strap",
    ]),
    whatsIncludedAr: JSON.stringify([
      "حقيبة حمل تكتيكية معززة بقماش كوردورا ١٠٠٠ دي",
      "حزام كتف مبطن وقابل للتعديل",
    ]),
    specsEn: JSON.stringify({
      Fabric: "1000D Ballistic PU-Coated Cordura",
      Zippers: "YKK #10 Heavy Duty Steel Dual Zippers",
      Hardware: "Champagne Gold Metal Alloy Buckles",
      Capacity: "Grill + Grate + Warming Rack + Accessories",
    }),
    specsAr: JSON.stringify({
      "نوع القماش": "كوردورا ١٠٠٠ دي معالج لمقاومة الماء",
      "نوع السحابات": "سحابات فولاذية مزدوجة YKK رقم ١٠",
      الإكسسوارات: "أبازيم وحلقات معدنية بلون الذهب الشامبانيا",
      السعة: "تستوعب الشواية والشبكة ورف التسخين والإكسسوارات بالكامل",
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_tongs_05",
    slug: "premium-stainless-steel-bbq-tongs",
    nameEn: "Premium Stainless Steel BBQ Tongs with Spatula & Locking Ring",
    nameAr: "ملقط شواء ستانلس ستيل فاخر مع ملعقة تقليب وقفل حلقي",
    shortDescriptionEn:
      "Premium stainless steel BBQ tongs designed for easy and precise food handling while grilling. Featuring a convenient spatula end, scalloped gripping edges, a comfortable non-slip grip, and a locking ring for compact storage.",
    shortDescriptionAr:
      "ملقط شواء ستانلس ستيل فاخر متعدد الاستخدامات مصمم لتحكم فائق أثناء الشواء. يجمع بين ملقط مسنن وملعقة تقليب مدمجة مع مقبض مريح مانع للانزلاق وحلقة قفل للتخزين المدمج.",
    descriptionEn: `### Premium BBQ Tongs for Better Grilling Control\n\nTake your grilling experience to the next level with these Premium Stainless Steel BBQ Tongs, designed to give you better control, precision, and convenience when handling food on the grill.\n\nCrafted with a durable stainless-steel construction, the tongs combine a scalloped gripping end for securely handling food with an integrated spatula-style end that makes flipping, lifting, and serving easier.\n\nThe ergonomic design features a comfortable non-slip grip, helping provide better handling and control during cooking. A built-in locking ring allows the tongs to be closed securely for convenient storage and helps keep your kitchen or grilling tools organized.\n\nWhether you're grilling meat, flipping burgers, serving vegetables, or handling food at the barbecue, this versatile tool is designed to make everyday grilling easier and more efficient.\n\n### Key Features\n- 🔒 **Locking Ring:** The integrated locking ring allows the tongs to be securely closed when not in use, making them easier to store.\n- 🥩 **Multi-Purpose Design:** Combines tongs and a spatula-style end in one practical grilling tool for handling, flipping, lifting, and serving food.\n- 🛡️ **Stainless Steel Construction:** Durable stainless-steel construction designed for everyday grilling and kitchen use.\n- ✋ **Non-Slip Comfort Grip:** The dark grip section provides a more comfortable and controlled handling experience while using the tongs.\n- 🍖 **Scalloped Gripping Edges:** The shaped gripping edges help hold food securely while grilling, flipping, and serving.\n- 🔥 **Ideal for BBQ & Grilling:** Perfect for handling a variety of foods during barbecue and grilling preparation.`,
    descriptionAr: `### ملقط شواء فاخر لتحكم أفضل أثناء الشواء\n\nارتقِ بتجربة الشواء إلى مستوى جديد مع ملقط الشواء الفاخر من الستانلس ستيل، المصمم ليمنحك تحكماً ودقة وسهولة فائقة عند التعامل مع مختلف الأطعمة على الشواية.\n\nمصنوع من هيكل متين من الفولاذ المقاوم للصدأ يجمع بذكاء بين طرف مسنن لإمساك اللحوم بإحكام وطرف عريض بنمط ملعقة تقليب (Spatula) لتسهيل التقليب والرفع والتقديم.\n\nيتميز التصميم المريح بمقبض مانع للانزلاق يوفر راحة وثباتاً أثناء الطهي، مع حلقة قفل مدمجة لإغلاق الملقط بإحكام للتخزين الأنيق والموفر للمساحة.\n\nسواء كنت تشوي اللحوم، تقلب البرجر، تقدم الخضار، أو تجهز المشويات، فإن هذه الأداة متعددة الاستخدامات مصممة لجعل الشواء أسهل وأكثر كفاءة واحترافية.\n\n### الميزات الرئيسية\n- 🔒 **حلقة قفل مدمجة:** تتيح إغلاق الملقط بإحكام لسهولة التخزين وتوفير المساحة.\n- 🥩 **تصميم متعدد الأغراض:** يدمج بين ملقط مسنن وملعقة تقليب مسطحة في أداة شواء عملية واحدة.\n- 🛡️ **هيكل ستانلس ستيل متين:** مقاوم للصدأ والحرارة ومصمم للاستخدام الشاق اليومي.\n- ✋ **مقبض مريح مانع للانزلاق:** يوفر تحكماً آمناً ومريحاً يمنع الانزلاق أثناء تقليب الأطعمة الساخنة.\n- 🍖 **حواف إمساك مسننة:** تصميم مقوس يمسك مختلف الأطعمة بإحكام ودون تمزيق.\n- 🔥 **مثالي للشواء والمطبخ:** الأداة المتكاملة لكافة أعمال الشواء والطهي والتقديم.`,
    pricePiasters: 85000,
    compareAtPricePiasters: 110000,
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
    nameEn: "3-in-1 BBQ Cleaning Brush with Scraper & Scrubbing Pad",
    nameAr: "فرشاة تنظيف الشوايات ٣ في ١ مع شفرة كشط وإسفنجة فرك",
    shortDescriptionEn:
      "Keep your grill clean and always ready to use with this all-in-one BBQ cleaning brush. A practical design combining 3 tools in 1: a built-in scraper for tough grease, sturdy metal bristles for deep cleaning, and a powerful scrubbing pad, complete with a comfortable grip for perfect, non-slip control.",
    shortDescriptionAr:
      "حافظ على شوايتك نظيفة وجاهزة دائماً مع هذه الفرشاة الشاملة ٣ في ١. تصميم عملي يجمع ٣ أدوات في أداة واحدة: شفرة كشط مدمجة للدهون الصعبة، شعيرات معدنية متينة للتنظيف العميق، وإسفنجة فرك قوية مع مقبض مريح غير قابل للانزلاق.",
    descriptionEn: `### The All-In-One Cleaning Brush for a Clean and Ready Grill\n\nMake post-BBQ grill cleaning a quick and easy task with the 3-in-1 BBQ Cleaning Brush. This tool is designed to be the ultimate solution for efficiently removing burnt-on grease and stuck food residue from your grill grates.\n\nThis smart design integrates three essential functions: a sturdy metal scraper at the front to remove hard buildup, durable metal bristles that penetrate between the grill bars to clean from all angles, and a bottom scrubbing pad for finishing touches and surface polishing.\n\nThanks to the comfortable, dual-arch, non-slip handle design, you can apply strong pressure while cleaning without straining your hands. This brush is the exact tool you need to ensure your grill stays in top condition and ready for your next barbecue.\n\n### Key Features\n- 🧼 **Powerful Scrubbing Pad:** A durable bottom pad perfect for wiping down and polishing the grill surface, removing any fine, leftover residue.\n- ✋ **Comfortable Non-Slip Grip:** An ergonomic design that allows you to hold the brush firmly and securely, providing maximum comfort and control while scrubbing.\n- 🔪 **Built-in Scraper:** A strong metal blade at the front of the brush specifically designed to easily scrape off tough grease and burnt-on food.\n- 🧹 **Sturdy Metal Bristles:** Tough and durable bristles designed to reach tricky corners and between grill grates for a deep, highly effective clean.\n- 🔥 **Keeps Your Grill Clean & Ready:** This comprehensive tool ensures your equipment remains perfectly clean and prepared for use at any time.`,
    descriptionAr: `### فرشاة التنظيف الشاملة ٣ في ١ لشواية نظيفة وجاهزة دائماً\n\nاجعل تنظيف الشواية بعد كل حفلة شواء مهمة سريعة وسهلة مع فرشاة تنظيف الشوايات ٣ في ١ من ستيلورا. صُممت هذه الأداة لتكون الحل الأمثل والنهائي لإزالة الدهون المتفحمة وبقايا الطعام العالقة على شبكات الشواء بكل فاعلية.\n\nيجمع هذا التصميم الذكي بين ثلاث وظائف أساسية: شفرة كشط معدنية صلبة في المقدمة لإزالة التراكمات القاسية، شعيرات معدنية متينة تخترق الفراغات بين قضبان الشبكة لتنظيفها من كافة الزوايا، وإسفنجة فرك سفلية للمسات النهائية وتلميع السطح.\n\nبفضل المقبض المريح ثنائي القوس المانع للانزلاق، يمكنك تطبيق ضغط قوي أثناء التنظيف دون إجهاد يديك أو معصمك، مما يضمن بقاء الشواية في أبهى حالاتها دائماً.\n\n### الميزات الرئيسية\n- 🧼 **إسفنجة فرك قوية:** قاعدة سفلية متينة لتنظيف وتلميع سطح الشبكة وإزالة الرواسب الدقيقة.\n- ✋ **مقبض مريح مانع للانزلاق:** تصميم مقوس ومريح يتيح لك الإمساك بقوة وتحكم تام أثناء التنظيف.\n- 🔪 **شفرة كشط مدمجة:** شفرة فولاذية أمامية قوية لكشط الدهون المتفحمة وبقايا الطعام المستعصية.\n- 🧹 **شعيرات معدنية متينة:** شعيرات صلبة تصل بين أسلاك الشبكة للتنظيف العميق والشامل.\n- 🔥 **تحافظ على الشواية جاهزة ونظيفة:** تضمن بقاء معدات الشواء نظيفة ولامعة وتطيل عمرها الافتراضي.`,
    pricePiasters: 75000,
    compareAtPricePiasters: 95000,
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
    nameEn: "Outdoor Luxury Set (4-Piece Suite)",
    nameAr: "طقم الفخامة الخارجية المتكامل (٤ قطع)",
    shortDescriptionEn:
      "The complete flagship outdoor suite: Foldable BBQ Grill (with Warming Rack), Folding Chair, Side Table/Stool, and Carry Bag at a 15% discount.",
    shortDescriptionAr:
      "المجموعة المتكاملة الأرقى: شواية الفحم (مع رف التسخين)، كرسي التخييم الفاخر، الطاولة الجانبية، وحقيبة الحمل بخصم ١٥٪.",
    descriptionEn: `The definitive mobile outdoor luxury experience. The STEELORA Outdoor Luxury Set brings together all four foundational pieces of our engineering mastery in a perfectly synchronized collection.\n\nBuying separately costs EGP 15,950. With our signature collection bundle, you receive the full 4-piece suite for just EGP 13,600 (Saving EGP 2,350 / 15% OFF) plus complimentary white-glove shipping anywhere in Egypt.`,
    descriptionAr: `تجربة الفخامة الخارجية المتنقلة المتكاملة بلا منازع. يجمع طقم الفخامة الخارجية من ستيلورا القطع الأربع الأساسية لتميزنا الهندسي في باقة متناغمة ومثالية.\n\nشراء القطع منفصلة يكلف ١٥,٩٥٠ ج.م. مع هذه المجموعة الحصرية، تحصل على الطقم الكامل المكون من ٤ قطع بسعر ١٣,٦٠٠ ج.م فقط (توفير ٢,٣٥٠ ج.م / خصم ١٥٪) مع شحن مجاني فاخر لكافة محافظات مصر.`,
    pricePiasters: 1360000,
    compareAtPricePiasters: 1595000,
    images: JSON.stringify(["/images/products/pro-max.jpg"]),
    category: "BUNDLE",
    mainCategory: "BUNDLE",
    subCategory: "BUNDLE",
    materialEn: "Complete 304 Marine Stainless Steel Suite + Tactical Ballistic Cordura",
    materialAr: "طقم كامل من الستانلس ستيل البحري ٣٠٤ + أقمشة كوردورا العسكرية المعززة",
    foldedDimensions: "Entire set packs down to 48 x 35 x 22 cm",
    openDimensions: "Full campsite living & gourmet grilling suite",
    weight: "13.5 kg Total",
    weightKg: 13.5,
    stock: 25,
    isFeatured: true,
    isBestSeller: true,
    whatsIncludedEn: JSON.stringify([
      "Foldable Charcoal BBQ Grill (with Grill Grate & Warming Rack)",
      "Foldable Outdoor Luxury Chair",
      "Foldable Side Table & Stool",
      "Reinforced 1000D Tactical Carry Bag",
      "Complimentary Stainless Steel Multi-Tool & Tongs",
      "10-Year Craftsmanship Warranty Certificate",
    ]),
    whatsIncludedAr: JSON.stringify([
      "شواية فحم فاخرة قابلة للطي (مع شبكة الشواء ورف التسخين العلوي)",
      "كرسي تخييم فاخر قابل للطي",
      "طاولة جانبية ومقعد صلب قابل للطي",
      "حقيبة حمل تكتيكية معززة من قماش الكوردورا",
      "ملقط وأداة شواء متعددة الوظائف من الستانلس ستيل مجاناً",
      "شهادة الضمان الشامل لمدة ١٠ سنوات",
    ]),
    specsEn: JSON.stringify({
      "Set Components": "4 Main Precision Items + Accessories",
      "Total Weight": "13.5 kg",
      "Pack Size": "Fits easily in any sedan trunk or rooftop box",
      Warranty: "10-Year Comprehensive Structural Guarantee",
      Shipping: "Free Insured Express Delivery across Egypt",
    }),
    specsAr: JSON.stringify({
      "مكونات الطقم": "٤ منتجات رئيسية فائقة الجودة + ملحقات إضافية",
      "الوزن الإجمالي": "١٣٫٥ كجم",
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
