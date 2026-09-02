import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateBag() {
  console.log("Updating Steelora Grill Bag in SQLite database...");

  const data = {
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
    materialEn: "Heavy-Duty High-Strength Dust-Resistant Fabric",
    materialAr: "قماش متين عالي التحمل ومقاوم للأتربة والأوساخ",
    foldedDimensions: "45 x 35 x 3 cm",
    openDimensions: "45 x 35 x 15 cm",
    weight: "0.5 kg",
    weightKg: 0.5,
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
  };

  const updated = await prisma.product.update({
    where: { slug: "heavy-duty-tactical-carry-bag" },
    data,
  });

  console.log("✔ Successfully updated bag in database:", updated.nameAr, updated.pricePiasters);
}

updateBag()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
