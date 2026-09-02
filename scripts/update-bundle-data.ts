import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateBundle() {
  console.log("Updating Grand Opening Bundle in SQLite database...");

  const data = {
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
    materialEn: "Premium Heat-Coated Steel Grill + Stainless Steel Accessories & Tactical Fabric",
    materialAr: "شواية صلب متين مدهون حرارياً + ملحقات ستانلس ستيل وأقمشة معززة فائقة التحمل",
    foldedDimensions: "Entire set packs down to 48 x 35 x 22 cm",
    openDimensions: "Complete 6-piece campsite living & gourmet grilling suite",
    weight: "9.8 kg Total",
    weightKg: 9.8,
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
  };

  const updatedProduct = await prisma.product.update({
    where: { slug: "outdoor-luxury-set" },
    data,
  });

  console.log("✔ Successfully updated bundle product:", updatedProduct.nameAr, "Price:", updatedProduct.pricePiasters);

  // Also update Bundle record if exists
  try {
    const updatedBundle = await prisma.bundle.update({
      where: { slug: "outdoor-luxury-set-bundle" },
      data: {
        nameEn: "Steelora Grand Opening Set (6-Piece Suite)",
        nameAr: "عرض الافتتاح من ستيلورا - طقم الشوي والرحلات المتكامل (6 قطع)",
        descriptionEn:
          "Special launch price: Get the complete 6-piece suite (Grill + Bag + Chair + Table + Tongs + Cleaning Brush) for just 2,570 EGP instead of 2,970 EGP.",
        descriptionAr:
          "عرض الافتتاح الحصري: احصل على الطقم المتكامل المكون من 6 قطع (شواية + شنطة + كرسي + ترابيزة + ماسك + فرشة) بسعر 2,570 ج.م بدلاً من 2,970 ج.م.",
        discountPercentage: 13.5,
        bundlePricePiasters: 257000,
        compareAtPricePiasters: 297000,
        itemProductSlugs: JSON.stringify([
          "foldable-charcoal-bbq-grill",
          "heavy-duty-tactical-carry-bag",
          "foldable-outdoor-chair",
          "foldable-side-table-stool",
          "premium-stainless-steel-bbq-tongs",
          "3-in-1-bbq-cleaning-brush-scraper",
        ]),
        badgeEn: "Save EGP 400 (Grand Opening)",
        badgeAr: "وفر ٤٠٠ ج.م (عرض الافتتاح)",
      },
    });
    console.log("✔ Successfully updated bundle record:", updatedBundle.nameAr);
  } catch (e) {
    console.log("Bundle record update skipped or created:", e);
  }
}

updateBundle()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
