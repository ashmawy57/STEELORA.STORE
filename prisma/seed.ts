import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to create products without strict client-generation type bottlenecks on Windows
async function createProduct(data: Record<string, unknown>) {
  return (prisma.product.create as Function)({ data }) as Promise<{ id: string }>;
}

async function main() {
  console.log("Seeding STEELORA database with bilingual EGP luxury data...");

  // Clean existing tables
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.bundle.deleteMany();
  await prisma.product.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.contactInquiry.deleteMany();

  // Products
  const grill = await createProduct({
      slug: "foldable-charcoal-bbq-grill",
      nameEn: "Foldable Charcoal BBQ Grill",
      nameAr: "شواية فحم فاخرة قابلة للطي",
      shortDescriptionEn:
        "Precision-engineered 304 stainless steel foldable barbecue system with upper warming rack and custom carry bag.",
      shortDescriptionAr:
        "نظام شواء متطور من الستانلس ستيل ٣٠٤ قابل للطي بالكامل مع رف تسخين علوي وحقيبة حمل فاخرة.",
      descriptionEn: `Engineered without compromise for outdoor culinary masters. The STEELORA Foldable Charcoal BBQ Grill merges aerospace-grade precision with heavy-gauge 304 food-grade stainless steel.

Featuring our patented instant-fold chassis, this grill transitions from a full-sized dual-zone pitmaster station into a 4.5cm flat profile in under 10 seconds.

### Key Included Components:
1. **Foldable 304 Stainless Steel Chassis:** Laser-perforated airflow geometry guarantees optimal oxygen feed to charcoal embers with zero flare-ups.
2. **Heavy-Duty 304 Stainless Steel Grill Grate:** Massive 2.0mm food-grade bars provide superior thermal retention and perfect sear marks.
3. **Elevated Upper Warming Rack:** Keeps cooked steaks, skewers, and vegetables warm and resting above the coals while grilling a second batch below.
4. **Custom 1000D Tactical Carry Bag:** Ballistic water-repellent Cordura with reinforced stitching and STEELORA gold metal emblem.`,
      descriptionAr: `صُممت بلا أي مساومة لعشاق ومحترفي الشواء في الطبيعة. تجمع شواية فحم ستيلورا القابلة للطي بين دقة الصناعات الثقيلة وأعلى درجات الفولاذ المقاوم للصدأ ٣٠٤ الصالح لملامسة الأغذية.

بفضل نظام الطي الفوري المبتكر، تتحول هذه الشواية من محطة طهي متكاملة متعددة المناطق إلى مسطح نحيف بسماكة ٤٫٥ سم في أقل من ١٠ ثوانٍ.

### أبرز المكونات المرفقة:
١. **هيكل ستانلس ستيل ٣٠٤ قابل للطي:** فتحات تهوية مدروسة بالليزر تضمن تدفق الهواء المثالي للجمر دون تطاير الرماد.
٢. **شبكة شواء ثقيلة من الستانلس ستيل ٣٠٤:** قضبان صلبة بسماكة ٢ ملم تمنحك علامات الشواء الاحترافية وحفظاً هائلاً للحرارة.
٣. **رف تسخين علوي مدمج:** يحافظ على اللحوم والمشويات دافئة وعصارية في الأعلى أثناء استكمال شواء الوجبة التالية بالأسفل.
٤. **حقيبة حمل تكتيكية مخصصة ١٠٠٠ دي:** مصنوعة من قماش الكوردورا الفاخر المقاوم للماء مع شعار ستيلورا الذهبي.`,
      pricePiasters: 795000, // 7,950 EGP
      compareAtPricePiasters: 950000, // 9,500 EGP
      images: JSON.stringify([
        "/images/products/grill-1.png",
        "/images/products/grill-2.png",
        "/images/products/grill-bag.png",
      ]),
      category: "CHARCOAL_GRILL",
      mainCategory: "BBQ",
      subCategory: "CHARCOAL_GRILL",
      materialEn: "100% 304 Food-Grade Marine Stainless Steel (2.0mm gauge)",
      materialAr: "ستانلس ستيل نقي ٣٠٤ صالح للأغذية ومقاوم للملوحة والصدأ (سماكة ٢ ملم)",
      foldedDimensions: "45 x 30 x 4.5 cm",
      openDimensions: "45 x 30 x 38 cm (Warming Rack at 52 cm)",
      weight: "6.8 kg",
      weightKg: 6.8,
      stock: 35,
      isFeatured: true,
      isBestSeller: true,
      whatsIncludedEn: JSON.stringify([
        "Foldable 304 Stainless Steel BBQ Grill Chassis",
        "Heavy-Duty Food-Grade 304 Stainless Steel Main Grill Grate",
        "Elevated Secondary Warming & Resting Rack",
        "Custom Padded 1000D Tactical Carry Bag",
        "Removable Stainless Steel Ash Catch Plate",
        "Dual Multi-Position Heat Level Handles",
      ]),
      whatsIncludedAr: JSON.stringify([
        "هيكل شواية فحم ستانلس ستيل ٣٠٤ قابل للطي بالكامل",
        "شبكة شواء رئيسية ثقيلة من الستانلس ستيل ٣٠٤ الصالح للأغذية",
        "رف تسخين وراحة علوي إضافي مدمج",
        "حقيبة حمل تكتيكية مبطنة ومخصصة من قماش الكوردورا ١٠٠٠ دي",
        "صينية رماد ستانلس ستيل قابلة للفك لسهولة التنظيف",
        "مقابض تحكم ثنائية لضبط مستويات الحرارة والتحريك",
      ]),
      specsEn: JSON.stringify({
        "Steel Grade": "AISI 304 (18/8 Stainless)",
        "Grilling Surface": "1,350 sq cm",
        "Warming Rack Surface": "540 sq cm",
        "Heat Resistance": "Up to 800°C (1,472°F)",
        "Fuel Compatibility": "Lump Charcoal, Briquettes, Hardwood",
        "Fold Time": "< 10 Seconds",
        "Origin": "Engineered & Manufactured in Cairo, Egypt",
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
  });

  const chair = await createProduct({
    slug: "foldable-outdoor-chair",
    nameEn: "Foldable Outdoor Luxury Chair",
    nameAr: "كرسي تخييم فاخر قابل للطي",
    shortDescriptionEn:
      "Ergonomic luxury outdoor chair with tubular 304 stainless steel frame and water-repellent heavy canvas.",
    shortDescriptionAr:
      "كرسي تخييم مريح ومصمم هندسياً بهيكل أنبوبي من الستانلس ستيل ٣٠٤ وقماش معزز عالي المتانة.",
    descriptionEn: `Engineered for ultimate comfort under the stars. The STEELORA Foldable Outdoor Chair utilizes a high-tensile 304 stainless steel tubular architecture paired with double-layered 1000D waterproof ballistic canvas.

Designed with an ergonomic reclining angle and reinforced mechanical pivot joints, it supports up to 180kg while folding into a compact cylindrical form factor.`,
    descriptionAr: `صُمم ليمنحك أقصى درجات الراحة والاسترخاء تحت السماء المفتوحة. يعتمد كرسي ستيلورا الخارجي القابل للطي على هيكل أنبوبي صلب من الستانلس ستيل ٣٠٤ مع طبقتين من قماش الكوردورا ١٠٠٠ دي المقاوم للماء والتآكل.

يوفر زاوية جلوس مريحة مدروسة ومفاصل تثبيت ميكانيكية تتحمل حتى ١٨٠ كجم مع إمكانية طيه لحجم مدمج للغاية.`,
    pricePiasters: 395000, // 3,950 EGP
    compareAtPricePiasters: 460000, // 4,600 EGP
    images: JSON.stringify([
      "/images/products/chair-1.png",
      "/images/products/chair-2.png",
    ]),
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
      "Fabric": "1000D Ballistic PU-Coated Waterproof Cordura",
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
  });

  const table = await createProduct({
    slug: "foldable-side-table-stool",
    nameEn: "Foldable Side Table / Stool",
    nameAr: "طاولة جانبية ومقعد قابل للطي",
    shortDescriptionEn:
      "Dual-function precision brushed 304 stainless steel surface. Serves as a campsite table or 150kg stool.",
    shortDescriptionAr:
      "طاولة جانبية ومقعد مزدوج الوظائف مصنوع من الستانلس ستيل ٣٠٤ المصقول والمخرم بالليزر بقدرة تحمل ١٥٠ كجم.",
    descriptionEn: `Precision versatility at its finest. The STEELORA Foldable Side Table & Stool features a laser-cut geometric tabletop that allows heat dissipation and fluid drainage.

The engineered X-brace folding legs lock rigidly into place, capable of serving as a drink & coffee table or supporting a 150kg adult as a sturdy stool.`,
    descriptionAr: `قمة التنوع الهندسي العملي. تتميز طاولة ومقعد ستيلورا بسطح علوي مخرم بدقة الليزر لتصريف السوائل وتشتيت الحرارة.

أرجل التثبيت المتقاطعة تمنح ثباتاً فائقاً، مما يجعلها مثالية كطاولة لتحضير القهوة والمشروبات أو كمقعد صلب يتحمل وزناً حتى ١٥٠ كجم.`,
    pricePiasters: 285000, // 2,850 EGP
    compareAtPricePiasters: 340000, // 3,400 EGP
    images: JSON.stringify([
      "/images/products/mini-chair.png",
    ]),
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
      "Material": "Brushed 304 Stainless Steel",
      "Load Capacity": "150 kg (Stool function)",
      "Folded Thickness": "3.5 cm Flat",
      "Top Surface": "Laser-Perforated Thermal Mesh",
    }),
    specsAr: JSON.stringify({
      "الخامة": "ستانلس ستيل ٣٠٤ عالي الجودة",
      "قدرة التحمل": "١٥٠ كجم (كمقعد صلب)",
      "سماكة الطي": "٣٫٥ سم فقط",
      "السطح العلوي": "شبكة مخرمة بالليزر لتصريف الحرارة",
    }),
  });

  const bag = await createProduct({
    slug: "heavy-duty-tactical-carry-bag",
    nameEn: "Reinforced Tactical Carry Bag",
    nameAr: "حقيبة حمل تكتيكية معززة",
    shortDescriptionEn:
      "1000D ballistic Cordura gear transport bag with gold hardware, Molle straps, and reinforced interior padding.",
    shortDescriptionAr:
      "حقيبة نقل معدات فاخرة من قماش الكوردورا ١٠٠٠ دي مع بطانة داخلية سميكة وسحابات يابانية مزدوجة.",
    descriptionEn: `Crafted to protect your investment. The STEELORA Tactical Carry Bag features military-grade 1000D Cordura fabric, heavy-duty interior thermal-resistant lining, and champagne gold metal hardware.

Equipped with dual exterior pockets for tongs, thermometer, and spices, plus ergonomic padded carrying handles and shoulder strap.`,
    descriptionAr: `صُنعت لحماية تجهيزاتك الفولاذية الثمينة. تتميز الحقيبة بقماش كوردورا عسكري ١٠٠٠ دي المقاوم للتمزق، مع بطانة داخلية معززة لمقاومة الحرارة وسحابات معدنية متينة.

مزودة بجيوب خارجية مخصصة لملاقط الشواء ومقاييس الحرارة، مع أحزمة كتف مبطنة مريحة للغاية.`,
    pricePiasters: 120000, // 1,200 EGP
    compareAtPricePiasters: 150000, // 1,500 EGP
    images: JSON.stringify([
      "/images/products/bag-1.png",
    ]),
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
      "Fabric": "1000D Ballistic PU-Coated Cordura",
      "Zippers": "YKK #10 Heavy Duty Steel Dual Zippers",
      "Hardware": "Champagne Gold Metal Alloy Buckles",
      "Capacity": "Grill + Grate + Warming Rack + Accessories",
    }),
    specsAr: JSON.stringify({
      "نوع القماش": "كوردورا ١٠٠٠ دي معالج لمقاومة الماء",
      "نوع السحابات": "سحابات فولاذية مزدوجة YKK رقم ١٠",
      "الإكسسوارات": "أبازيم وحلقات معدنية بلون الذهب الشامبانيا",
      "السعة": "تستوعب الشواية والشبكة ورف التسخين والإكسسوارات بالكامل",
    }),
  });

  const tongs = await createProduct({
    slug: "premium-stainless-steel-bbq-tongs",
    nameEn: "Premium Stainless Steel BBQ Tongs with Spatula & Locking Ring",
    nameAr: "ملقط شواء ستانلس ستيل فاخر مع ملعقة تقليب وقفل حلقي",
    shortDescriptionEn:
      "Premium stainless steel BBQ tongs designed for easy and precise food handling while grilling. Featuring a convenient spatula end, scalloped gripping edges, a comfortable non-slip grip, and a locking ring for compact storage.",
    shortDescriptionAr:
      "ملقط شواء ستانلس ستيل فاخر متعدد الاستخدامات مصمم لتحكم فائق أثناء الشواء. يجمع بين ملقط مسنن وملعقة تقليب مدمجة مع مقبض مريح مانع للانزلاق وحلقة قفل للتخزين المدمج.",
    descriptionEn: `### Premium BBQ Tongs for Better Grilling Control

Take your grilling experience to the next level with these Premium Stainless Steel BBQ Tongs, designed to give you better control, precision, and convenience when handling food on the grill.

Crafted with a durable stainless-steel construction, the tongs combine a scalloped gripping end for securely handling food with an integrated spatula-style end that makes flipping, lifting, and serving easier.

The ergonomic design features a comfortable non-slip grip, helping provide better handling and control during cooking. A built-in locking ring allows the tongs to be closed securely for convenient storage and helps keep your kitchen or grilling tools organized.

Whether you're grilling meat, flipping burgers, serving vegetables, or handling food at the barbecue, this versatile tool is designed to make everyday grilling easier and more efficient.

### Key Features
- 🔒 **Locking Ring:** The integrated locking ring allows the tongs to be securely closed when not in use, making them easier to store.
- 🥩 **Multi-Purpose Design:** Combines tongs and a spatula-style end in one practical grilling tool for handling, flipping, lifting, and serving food.
- 🛡️ **Stainless Steel Construction:** Durable stainless-steel construction designed for everyday grilling and kitchen use.
- ✋ **Non-Slip Comfort Grip:** The dark grip section provides a more comfortable and controlled handling experience while using the tongs.
- 🍖 **Scalloped Gripping Edges:** The shaped gripping edges help hold food securely while grilling, flipping, and serving.
- 🔥 **Ideal for BBQ & Grilling:** Perfect for handling a variety of foods during barbecue and grilling preparation.`,
    descriptionAr: `### ملقط شواء فاخر لتحكم أفضل أثناء الشواء

ارتقِ بتجربة الشواء إلى مستوى جديد مع ملقط الشواء الفاخر من الستانلس ستيل، المصمم ليمنحك تحكماً ودقة وسهولة فائقة عند التعامل مع مختلف الأطعمة على الشواية.

مصنوع من هيكل متين من الفولاذ المقاوم للصدأ يجمع بذكاء بين طرف مسنن لإمساك اللحوم بإحكام وطرف عريض بنمط ملعقة تقليب (Spatula) لتسهيل التقليب والرفع والتقديم.

يتميز التصميم المريح بمقبض مانع للانزلاق يوفر راحة وثباتاً أثناء الطهي، مع حلقة قفل مدمجة لإغلاق الملقط بإحكام للتخزين الأنيق والموفر للمساحة.

سواء كنت تشوي اللحوم، تقلب البرجر، تقدم الخضار، أو تجهز المشويات، فإن هذه الأداة متعددة الاستخدامات مصممة لجعل الشواء أسهل وأكثر كفاءة واحترافية.

### الميزات الرئيسية
- 🔒 **حلقة قفل مدمجة:** تتيح إغلاق الملقط بإحكام لسهولة التخزين وتوفير المساحة.
- 🥩 **تصميم متعدد الأغراض:** يدمج بين ملقط مسنن وملعقة تقليب مسطحة في أداة شواء عملية واحدة.
- 🛡️ **هيكل ستانلس ستيل متين:** مقاوم للصدأ والحرارة ومصمم للاستخدام الشاق اليومي.
- ✋ **مقبض مريح مانع للانزلاق:** يوفر تحكماً آمناً ومريحاً يمنع الانزلاق أثناء تقليب الأطعمة الساخنة.
- 🍖 **حواف إمساك مسننة:** تصميم مقوس يمسك مختلف الأطعمة بإحكام ودون تمزيق.
- 🔥 **مثالي للشواء والمطبخ:** الأداة المتكاملة لكافة أعمال الشواء والطهي والتقديم.`,
    pricePiasters: 85000, // 850 EGP
    compareAtPricePiasters: 110000, // 1,100 EGP
    images: JSON.stringify([
      "/images/products/tongs-main.png",
    ]),
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
      "Material": "Stainless Steel",
      "Design": "Multi-Purpose (Scalloped Gripper + Spatula)",
      "Grip": "Non-Slip Comfort Grip",
      "End Design": "Scalloped Gripper + Spatula",
      "Storage": "Locking Ring",
      "Application": "BBQ / Grilling / Kitchen",
      "Color": "Stainless Steel / Black Accent",
      "Quantity": "1 Piece",
    }),
    specsAr: JSON.stringify({
      "نوع المنتج": "ملقط شواء متعدد الأغراض / أداة تقديم المشويات",
      "الخامة": "ستانلس ستيل مقاوم للصدأ",
      "التصميم": "متعدد الاستخدامات (ملقط مسنن + ملعقة تقليب)",
      "المقبض": "مقبض مريح مانع للانزلاق",
      "تصميم الأطراف": "طرف مسنن + ملعقة تقليب عريضة",
      "التخزين": "حلقة قفل سحب مدمجة",
      "الاستخدام": "الشواء / الطهي / المطبخ",
      "اللون": "فضي ستانلس ستيل / أسود",
      "الكمية": "قطعة واحدة",
    }),
  });

  const grillBrush = await createProduct({
    slug: "3-in-1-bbq-cleaning-brush-scraper",
    nameEn: "3-in-1 BBQ Cleaning Brush with Scraper & Scrubbing Pad",
    nameAr: "فرشاة تنظيف الشوايات ٣ في ١ مع شفرة كشط وإسفنجة فرك",
    shortDescriptionEn:
      "Keep your grill clean and always ready to use with this all-in-one BBQ cleaning brush. A practical design combining 3 tools in 1: a built-in scraper for tough grease, sturdy metal bristles for deep cleaning, and a powerful scrubbing pad, complete with a comfortable grip for perfect, non-slip control.",
    shortDescriptionAr:
      "حافظ على شوايتك نظيفة وجاهزة دائماً مع هذه الفرشاة الشاملة ٣ في ١. تصميم عملي يجمع ٣ أدوات في أداة واحدة: شفرة كشط مدمجة للدهون الصعبة، شعيرات معدنية متينة للتنظيف العميق، وإسفنجة فرك قوية مع مقبض مريح غير قابل للانزلاق.",
    descriptionEn: `### The All-In-One Cleaning Brush for a Clean and Ready Grill

Make post-BBQ grill cleaning a quick and easy task with the 3-in-1 BBQ Cleaning Brush. This tool is designed to be the ultimate solution for efficiently removing burnt-on grease and stuck food residue from your grill grates.

This smart design integrates three essential functions: a sturdy metal scraper at the front to remove hard buildup, durable metal bristles that penetrate between the grill bars to clean from all angles, and a bottom scrubbing pad for finishing touches and surface polishing.

Thanks to the comfortable, dual-arch, non-slip handle design, you can apply strong pressure while cleaning without straining your hands. This brush is the exact tool you need to ensure your grill stays in top condition and ready for your next barbecue.

### Key Features
- 🧼 **Powerful Scrubbing Pad:** A durable bottom pad perfect for wiping down and polishing the grill surface, removing any fine, leftover residue.
- ✋ **Comfortable Non-Slip Grip:** An ergonomic design that allows you to hold the brush firmly and securely, providing maximum comfort and control while scrubbing.
- 🔪 **Built-in Scraper:** A strong metal blade at the front of the brush specifically designed to easily scrape off tough grease and burnt-on food.
- 🧹 **Sturdy Metal Bristles:** Tough and durable bristles designed to reach tricky corners and between grill grates for a deep, highly effective clean.
- 🔥 **Keeps Your Grill Clean & Ready:** This comprehensive tool ensures your equipment remains perfectly clean and prepared for use at any time.`,
    descriptionAr: `### فرشاة التنظيف الشاملة ٣ في ١ لشواية نظيفة وجاهزة دائماً

اجعل تنظيف الشواية بعد كل حفلة شواء مهمة سريعة وسهلة مع فرشاة تنظيف الشوايات ٣ في ١ من ستيلورا. صُممت هذه الأداة لتكون الحل الأمثل والنهائي لإزالة الدهون المتفحمة وبقايا الطعام العالقة على شبكات الشواء بكل فاعلية.

يجمع هذا التصميم الذكي بين ثلاث وظائف أساسية: شفرة كشط معدنية صلبة في المقدمة لإزالة التراكمات القاسية، شعيرات معدنية متينة تخترق الفراغات بين قضبان الشبكة لتنظيفها من كافة الزوايا، وإسفنجة فرك سفلية للمسات النهائية وتلميع السطح.

بفضل المقبض المريح ثنائي القوس المانع للانزلاق، يمكنك تطبيق ضغط قوي أثناء التنظيف دون إجهاد يديك أو معصمك، مما يضمن بقاء الشواية في أبهى حالاتها دائماً.

### الميزات الرئيسية
- 🧼 **إسفنجة فرك قوية:** قاعدة سفلية متينة لتنظيف وتلميع سطح الشبكة وإزالة الرواسب الدقيقة.
- ✋ **مقبض مريح مانع للانزلاق:** تصميم مقوس ومريح يتيح لك الإمساك بقوة وتحكم تام أثناء التنظيف.
- 🔪 **شفرة كشط مدمجة:** شفرة فولاذية أمامية قوية لكشط الدهون المتفحمة وبقايا الطعام المستعصية.
- 🧹 **شعيرات معدنية متينة:** شعيرات صلبة تصل بين أسلاك الشبكة للتنظيف العميق والشامل.
- 🔥 **تحافظ على الشواية جاهزة ونظيفة:** تضمن بقاء معدات الشواء نظيفة ولامعة وتطيل عمرها الافتراضي.`,
    pricePiasters: 75000, // 750 EGP
    compareAtPricePiasters: 95000, // 950 EGP
    images: JSON.stringify([
      "/images/products/grill-brush-main.png",
    ]),
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
      "Design": "3-in-1 (Bristles, Scraper, Scrubbing Pad)",
      "Grip": "Reinforced Plastic with Ergonomic Non-Slip Design",
      "Bristle Material": "Durable Metal (Wire Bristles)",
      "Scraper Material": "Stainless Steel",
      "Application": "Cleaning Grill Grates (Gas, Charcoal, Electric)",
      "Color": "Black / Metallic",
      "Quantity": "1 Piece",
    }),
    specsAr: JSON.stringify({
      "نوع المنتج": "فرشاة تنظيف الشوايات ٣ في ١",
      "التصميم": "٣ في ١ (شعيرات معدنية، شفرة كشط، إسفنجة فرك)",
      "المقبض": "بلاستيك مقوى بتصميم مريح مانع للانزلاق",
      "مادة الشعيرات": "معدن متين (شعيرات سلكية صلبة)",
      "مادة شفرة الكشط": "ستانلس ستيل مقاوم للصدأ",
      "الاستخدام": "تنظيف شبكات الشواء (غاز، فحم، كهرباء)",
      "اللون": "أسود / معدني",
      "الكمية": "قطعة واحدة",
    }),
  });

  const bundleProduct = await createProduct({
    slug: "outdoor-luxury-set",
    nameEn: "Outdoor Luxury Set (4-Piece Suite)",
      nameAr: "طقم الفخامة الخارجية المتكامل (٤ قطع)",
      shortDescriptionEn:
        "The complete flagship outdoor suite: Foldable BBQ Grill (with Warming Rack), Folding Chair, Side Table/Stool, and Carry Bag at a 15% discount.",
      shortDescriptionAr:
        "المجموعة المتكاملة الأرقى: شواية الفحم (مع رف التسخين)، كرسي التخييم الفاخر، الطاولة الجانبية، وحقيبة الحمل بخصم ١٥٪.",
      descriptionEn: `The definitive mobile outdoor luxury experience. The STEELORA Outdoor Luxury Set brings together all four foundational pieces of our engineering mastery in a perfectly synchronized collection.

Buying separately costs EGP 15,950. With our signature collection bundle, you receive the full 4-piece suite for just EGP 13,600 (Saving EGP 2,350 / 15% OFF) plus complimentary white-glove shipping anywhere in Egypt.

### What is Included in the Set:
1. **Foldable Charcoal BBQ Grill:** With heavy-duty 304 stainless grill grate and upper warming rack.
2. **Foldable Outdoor Luxury Chair:** Stainless steel tubular frame with 1000D ballistic waterproof canvas.
3. **Foldable Side Table & Stool:** Brushed 304 steel laser-perforated multi-purpose surface.
4. **Tactical Reinforced Carry Bag:** Padded 1000D Cordura transport bag with shoulder strap.`,
      descriptionAr: `تجربة الفخامة الخارجية المتنقلة المتكاملة بلا منازع. يجمع طقم الفخامة الخارجية من ستيلورا القطع الأربع الأساسية لتميزنا الهندسي في باقة متناغمة ومثالية.

شراء القطع منفصلة يكلف ١٥,٩٥٠ ج.م. مع هذه المجموعة الحصرية، تحصل على الطقم الكامل المكون من ٤ قطع بسعر ١٣,٦٠٠ ج.م فقط (توفير ٢,٣٥٠ ج.م / خصم ١٥٪) مع شحن مجاني فاخر لكافة محافظات مصر.

### محتويات المجموعة المتكاملة:
١. **شواية الفحم الفاخرة القابلة للطي:** تشمل شبكة الشواء الثقيلة ورف التسخين العلوي المدمج.
٢. **كرسي التخييم الفاخر القابل للطي:** هيكل ستانلس ستيل ٣٠٤ مع قماش كوردورا مقاوم للماء.
٣. **الطاولة الجانبية والمقعد القابل للطي:** سطح ستانلس ستيل مخرم بالليزر متعدد الاستخدامات.
٤. **حقيبة الحمل التكتيكية المعززة:** قماش كوردورا ١٠٠٠ دي المبطن مع حزام الكتف.`,
      pricePiasters: 1360000, // 13,600 EGP
      compareAtPricePiasters: 1595000, // 15,950 EGP
      images: JSON.stringify([
        "/images/products/pro-max.jpg",
      ]),
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
        "Warranty": "10-Year Comprehensive Structural Guarantee",
        "Shipping": "Free Insured Express Delivery across Egypt",
      }),
      specsAr: JSON.stringify({
        "مكونات الطقم": "٤ منتجات رئيسية فائقة الجودة + ملحقات إضافية",
        "الوزن الإجمالي": "١٣٫٥ كجم",
        "حجم التخزين": "يمكن وضعه بسهولة في صندوق أي سيارة صغيرة",
        "الضمان": "ضمان هيكلي شامل لمدة ١٠ سنوات",
        "الشحن والتوصيل": "شحن مجاني سريع ومؤمن لكافة أنحاء مصر",
      }),
  });

  // Bundle Definition
  await prisma.bundle.create({
    data: {
      slug: "outdoor-luxury-set-bundle",
      nameEn: "The Outdoor Luxury Set Bundle",
      nameAr: "طقم الفخامة الخارجية المتكامل",
      descriptionEn:
        "Save 15% when ordering the complete 4-piece suite together: Grill + Chair + Table + Carry Bag.",
      descriptionAr: "وفر ١٥٪ عند طلب الطقم الكامل المكون من ٤ قطع معاً: الشواية + الكرسي + الطاولة + حقيبة الحمل.",
      discountPercentage: 15.0,
      bundlePricePiasters: 1360000, // 13,600 EGP
      compareAtPricePiasters: 1595000, // 15,950 EGP
      itemProductSlugs: JSON.stringify([
        "foldable-charcoal-bbq-grill",
        "foldable-outdoor-chair",
        "foldable-side-table-stool",
        "heavy-duty-tactical-carry-bag",
      ]),
      badgeEn: "Save 15% (EGP 2,350)",
      badgeAr: "وفر ١٥٪ (٢,٣٥٠ ج.م)",
    },
  });

  // Customer Reviews
  await prisma.review.createMany({
    data: [
      {
        productId: grill.id,
        author: "Tarek Mansour (Verified Pitmaster - Giza)",
        rating: 5,
        commentEn:
          "The upper warming rack is a game changer for desert cookouts. We seared tomahawks below while resting smoked ribs on the top rack. Folds completely flat and cleanup was effortless.",
        commentAr:
          "رف التسخين العلوي ميزة استثنائية في رحلات الشواء الصحراوية. قمنا بشواء اللحوم بالأسفل وحفظها دافئة في الأعلى. تنطوي في ثوانٍ وتنظيف الستانلس ستيل سهل للغاية.",
        verifiedPurchase: true,
      },
      {
        productId: grill.id,
        author: "Dr. Sherif El-Wakil (Cairo)",
        rating: 5,
        commentEn:
          "Spectacular 304 stainless steel craft. You can immediately feel the heavy gauge and precision laser cuts. The gold badge and bag make it feel like luxury luggage.",
        commentAr:
          "صناعة مذهلة وفولاذ ٣٠٤ نقي وفائق السماكة. تشعر بدقة القص بالليزر وجودة اللحامات من اللحظة الأولى. الحقيبة والشعار الذهبي يمنحان شعوراً بالرفاهية العالية.",
        verifiedPurchase: true,
      },
      {
        productId: chair.id,
        author: "Omar Abdel-Aziz (Alexandria)",
        rating: 5,
        commentEn:
          "Solid as a rock. Does not wobble on limestone or sand. Extremely comfortable back support for long evening campfires.",
        commentAr:
          "ثابت كالحديد ولا يهتز نهائياً على الصخور أو الرمال. مريح جداً للظهر في جلسات التخييم الليلية الطويلة.",
        verifiedPurchase: true,
      },
      {
        productId: table.id,
        author: "Karim Hegazi (El Gouna)",
        rating: 5,
        commentEn:
          "Doubles as a super sturdy stool and coffee table. The laser perforated mesh top prevents any liquid accumulation.",
        commentAr:
          "ممتازة وتستخدم كطاولة لتحضير القهوة وكمقعد قوي جداً في نفس الوقت. الفتحات المخرمة تمنع تجمع أي سوائل على السطح.",
        verifiedPurchase: true,
      },
      {
        productId: tongs.id,
        author: "Yasser Mansi (Mansoura)",
        rating: 5,
        commentEn:
          "The grip precision is unbelievable. 42cm length keeps my arms completely safe from flare-ups, and the lock mechanism is super crisp.",
        commentAr:
          "إحكام المسك وقوة الملقط مذهلة. طول ٤٢ سم يوفر حماية تامة لليدين من لهب الفحم، وآلية القفل ناعمة وسريعة جداً.",
        verifiedPurchase: true,
      },
      {
        productId: grillBrush.id,
        author: "Capt. Hany Nour (Hurghada)",
        rating: 5,
        commentEn:
          "Best grill cleaner I have ever owned. The 3-in-1 triple coil cleans every side of the 304 stainless grate with minimal effort.",
        commentAr:
          "أفضل فرشاة تنظيف شوايات جربتها. الرأس الثلاثي الحلزوني ينظف أسلاك شبكة الشواء من كافة الجوانب بجهد قليل جداً وبدون تساقط للشعيرات.",
        verifiedPurchase: true,
      },
      {
        productId: bundleProduct.id,
        author: "Hossam Fathy (New Cairo)",
        rating: 5,
        commentEn:
          "Purchased the full 4-piece Outdoor Luxury Set for our Red Sea expeditions. Everything fits neatly into our vehicle trunk. The 15% bundle discount made it unbeatable value for this level of luxury.",
        commentAr:
          "اشتريت طقم الفخامة المتكامل المكون من ٤ قطع لرحلات البحر الأحمر. المجموعة بالكامل توضع بأناقة في حقيبة السيارة. خصم الـ ١٥٪ جعل القيمة ممتازة جداً لهذه الجودة الاستثنائية.",
        verifiedPurchase: true,
      },
    ],
  });

  // Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        slug: "mastering-charcoal-grilling-in-the-wild",
        titleEn: "Mastering Charcoal Grilling in the Egyptian Wilderness",
        titleAr: "أسرار وفنون شواء الفحم الاحترافي في الطبيعة المصرية",
        excerptEn:
          "How two-tier temperature zones and high-gauge 304 stainless steel allow you to cook world-class steaks anywhere from Fayoum to Ras Shitan.",
        excerptAr:
          "كيف تمنحك مناطق الحرارة الثنائية وفولاذ ٣٠٤ المقاوم للصدأ تجربة طهي احترافية تضاهي أرقى المطاعم في أي مكان من الفيوم إلى رأس شيطان.",
        contentEn: `Outdoor cooking is an art of thermal control. When you are camping in the open desert or by the Mediterranean coast, wind conditions and ambient temperatures challenge standard portable grills.

### 1. The Superiority of 304 Food-Grade Stainless Steel
Unlike thin stamped sheet metal or coated cast iron that rusts after one beach trip, 304 stainless steel retains heat evenly across its entire surface. It reflects radiant infrared heat back toward the coals, cutting fuel consumption by nearly 30%.

### 2. Dual-Zone Grilling with the Upper Warming Rack
The STEELORA upper warming rack solves the biggest dilemma of camp cooking: timing. While searing high-heat steaks on the primary 2.0mm grate, resting cuts and slow-roasting skewers sit safely on the elevated rack, bathing in gentle convection smoke.

### 3. Cleaning & Longevity
Because our gear has no painted coatings, maintenance requires only warm water and a scouring pad. It is 100% rustproof and built to last a lifetime.`,
        contentAr: `الطهي في الهواء الطلق فن يعتمد على التحكم في درجات الحرارة. عند التخييم في الصحراء المفتوحة أو على شواطئ البحر، تشكل الرياح والحرارة تحدياً كبيراً للشوايات التقليدية.

### ١. تفوق الفولاذ المقاوم للصدأ ٣٠٤ الصالح للأغذية
على عكس الصاج الرقيق أو الحديد المطلي الذي يصدأ بعد رحلة شاطئية واحدة، يحتفظ الستانلس ستيل ٣٠٤ بالحرارة ويوزعها بتجانس مذهل على كامل سطح الشواء، مما يقلل استهلاك الفحم بنسبة ٣٠٪.

### ٢. تقنية المناطق الثنائية مع رف التسخين العلوي
يقدم رف التسخين العلوي في شواية ستيلورا حلاً جذرياً لأكبر مشكلة في الشواء الخارجي: توقيت نضج اللحوم. فبينما تقوم بصدم اللحوم على الشبكة السفلية، يمكنك وضع القطع الناضجة لترتاح بالحرارة اللطيفة في الرف العلوي دون أن تجف.

### ٣. سهولة التنظيف والعناية
نظراً لخلو منتجاتنا من أي طلاء كيميائي، كل ما تحتاجه هو الماء الدافئ وإسفنجة تنظيف بسيطة لتعود الشواية لامعة كالجديدة تماماً.`,
        categoryEn: "Pitmaster Guides",
        categoryAr: "دليل خبراء الشواء",
        readTimeEn: "4 min read",
        readTimeAr: "٤ دقائق للقراءة",
        coverImage: "/images/products/grill-main.jpg",
      },
      {
        slug: "why-precision-folding-changes-outdoor-luxury",
        titleEn: "Why Precision Folding is the Future of Outdoor Luxury",
        titleAr: "لماذا تمثل هندسة الطي الدقيقة مستقبل الفخامة الخارجية؟",
        excerptEn:
          "Discover the architectural engineering behind interlocking stainless steel hinges that collapse 15kg of gear into a slim laptop-sized briefcase.",
        excerptAr:
          "تعرف على الأسرار الهندسية للمفصلات الفولاذية المدمجة التي تحول ١٥ كجم من التجهيزات الصلبة إلى مسطحات نحيفة سهلة الحمل.",
        contentEn: `True luxury in the modern world is freedom of movement. For decades, outdoor enthusiasts faced a trade-off: buy flimsy, unstable camping gear that packs small, or haul heavy, bulky furniture that takes up an entire SUV trunk.

STEELORA eliminated this compromise through CNC fiber laser engineering and precision geometry. By designing interlocking structural folds, the gear achieves immense mechanical rigidity under weight, while folding completely flat in seconds.`,
        contentAr: `الفخامة الحقيقية في العصر الحديث هي حرية الحركة والانطلاق. لعقود طويلة، واجه عشاق التخييم خيارين لا ثالث لهما: إما معدات خفيفة هشة وغير مستقرة، أو أثاث ضخم وثقيل يملأ صندوق السيارة بالكامل.

ألغت ستيلورا هذه المساومة عبر القص بألياف الليزر والهندسة الإنشائية المتقدمة. من خلال تصميم طيات متداخلة، تحقق المعدات ثباتاً هائلاً أثناء الاستخدام، وتنطوي لتصبح مسطحة بالكامل في ثوانٍ معدودة.`,
        categoryEn: "Engineering & Craft",
        categoryAr: "الهندسة والحرفية",
        readTimeEn: "5 min read",
        readTimeAr: "٥ دقائق للقراءة",
        coverImage: "/images/about/craftsmanship.jpg",
      },
    ],
  });

  console.log("Database seeded successfully with bilingual luxury products, bundle, reviews, and journal posts!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
